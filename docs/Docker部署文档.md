# LJY-Web 项目 Docker 全流程部署文档

## 一、项目概述

### 1.1 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 前端 | React 19 + Vite 6 + TypeScript | 构建工具使用 Vite |
| 前端服务器 | Nginx Alpine | 生产环境反向代理 |
| 后端 | Python 3.10 + FastAPI | RESTful API 框架 |
| 数据库 | SQLite | 轻量级关系数据库 |
| 容器化 | Docker + Docker Compose | 容器编排 |
| API文档 | Swagger UI + ReDoc | 自动生成API文档 |

### 1.2 目录结构

```
ljy-web/
├── frontend.Dockerfile          # 前端 Nginx 镜像构建文件
├── backend.Dockerfile            # 后端独立镜像构建文件
├── Dockerfile                   # 前后端分离镜像构建文件（已废弃）
├── Dockerfile.simple             # 简化版后端镜像（开发用）
├── docker-compose.yml            # 生产环境编排文件
├── nginx.conf                    # Nginx 反向代理配置
├── .env.production               # 前端生产环境变量
├── backend/
│   ├── .env                      # 后端环境变量配置
│   ├── requirements.txt          # Python 依赖清单
│   ├── main.py                   # FastAPI 主入口
│   ├── simple_server.py         # 简化版服务器（开发用）
│   ├── Dockerfile.order         # 订单服务 Dockerfile
│   └── app/                      # 应用核心代码
│       ├── config.py             # 配置管理
│       ├── api/                  # API 路由
│       ├── models/               # 数据模型
│       ├── schemas/              # Pydantic 模型
│       └── services/             # 业务逻辑
├── src/                          # 前端 React 源码
└── static/                       # 静态资源目录
```

### 1.3 服务端口

| 服务 | 端口 | 说明 |
|------|------|------|
| Frontend (Nginx) | 9010 | 前端访问入口 |
| Backend (FastAPI) | 8010 | 后端 API 服务 |
| Swagger Docs | 8010/docs | API 文档 |
| ReDoc Docs | 8010/redoc | 替代文档 |

---

## 二、部署方案

本项目提供 **两套部署方案**：

### 方案一：前后端分离部署（推荐生产环境使用）

- **前端**：独立 Nginx 容器，端口 9010
- **后端**：独立 FastAPI 容器，端口 8010
- **优点**：独立扩展、便于调试、资源隔离

### 方案二：前后端融合部署（已废弃）

- 将前端构建产物嵌入后端容器
- 后端同时提供 API 和静态文件服务
- **不推荐使用**，仅作历史参考

---

## 三、详细部署步骤

### 3.1 环境准备

#### 3.1.1 安装 Docker

**Windows/macOS:**

```bash
# 下载 Docker Desktop
https://www.docker.com/products/docker-desktop

# 验证安装
docker --version
docker-compose --version
```

**Linux (Ubuntu):**

```bash
# 更新apt源
sudo apt update

# 安装必要依赖
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# 添加 Docker GPG 密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 添加 Docker 仓库
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装 Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# 将当前用户加入 docker 组（免 sudo）
sudo usermod -aG docker $USER

# 验证安装
docker --version
```

#### 3.1.2 验证 Docker 运行状态

```bash
# 检查 Docker 服务状态
sudo systemctl status docker

# 运行测试容器
docker run hello-world

# 检查 Docker Compose
docker compose version
```

---

### 3.2 方案一：前后端分离部署（推荐）

#### 3.2.1 目录结构说明

```
项目根目录 (ljy-web/)
├── frontend.Dockerfile    # 前端构建
├── backend.Dockerfile     # 后端构建
├── docker-compose.yml     # 编排配置
├── nginx.conf             # Nginx 配置
├── .env.production        # 前端环境变量
└── backend/
    ├── .env               # 后端环境变量
    └── requirements.txt    # Python 依赖
```

#### 3.2.2 配置文件说明

**docker-compose.yml:**

```yaml
services:
  # ==================== 后端服务 ====================
  backend:
    build:
      context: .                          # Docker 构建上下文（相对于 docker-compose.yml 所在目录）
      dockerfile: backend.Dockerfile     # 后端 Dockerfile 路径
    image: ljy-web-backend:latest         # 镜像名称和标签
    container_name: ljy-web-backend      # 容器名称
    ports:
      - "8010:8010"                      # 宿主机端口:容器端口
    environment:                          # 环境变量
      - DEBUG=False                       # 生产环境关闭调试
      - BACKEND_CORS_ORIGINS=["http://localhost:9010","http://127.0.0.1:9010"]
    restart: unless-stopped               # 容器异常退出时自动重启
    volumes:                              # 数据卷挂载（可选，生产环境建议使用）
      - ./backend/data:/app/data          # 持久化数据库
    healthcheck:                           # 健康检查配置
      test: ["CMD", "python", "-c", "import requests; requests.get('http://localhost:8010/api/health')"]
      interval: 30s                        # 检查间隔
      timeout: 10s                         # 超时时间
      retries: 3                           # 重试次数
      start_period: 40s                    # 容器启动后多久开始检查

  # ==================== 前端服务 ====================
  frontend:
    build:
      context: .                          # Docker 构建上下文
      dockerfile: frontend.Dockerfile    # 前端 Dockerfile 路径
    image: ljy-web-frontend:latest       # 镜像名称和标签
    container_name: ljy-web-frontend      # 容器名称
    ports:
      - "9010:9010"                      # 宿主机端口:容器端口
    depends_on:                           # 依赖关系（启动顺序）
      - backend
    restart: unless-stopped               # 自动重启

# 网络配置
networks:
  default:
    name: ljy-web-network                # 自定义网络名称
```

**nginx.conf:**

```nginx
server {
    listen 9010;                          # Nginx 监听端口（与 docker-compose.yml 中的容器端口一致）
    server_name localhost;                # 服务器名称
    root /usr/share/nginx/html;           # 前端构建产物目录（Nginx 容器的容器内路径）
    index index.html;

    # SPA 路由支持：所有路径回退到 index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # ==================== API 反向代理 ====================
    location /api/ {
        proxy_pass http://backend:8010/api/;   # 代理到后端容器（container_name:port）
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
        proxy_intercept_errors off;
    }

    # ==================== 静态文件代理 ====================
    location /static/ {
        proxy_pass http://backend:8010/static/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # ==================== API 文档代理 ====================
    location /docs/ {
        proxy_pass http://backend:8010/docs/;
        proxy_set_header Host $host;
    }

    location /redoc/ {
        proxy_pass http://backend:8010/redoc/;
        proxy_set_header Host $host;
    }

    location /openapi.json {
        proxy_pass http://backend:8010/openapi.json;
        proxy_set_header Host $host;
    }
}
```

**backend.Dockerfile:**

```dockerfile
# 基于 Python 3.10 轻量级镜像
FROM python:3.10-slim

# 设置工作目录
WORKDIR /app

# 升级 pip
RUN pip install --upgrade pip

# 复制依赖清单并安装（利用 Docker 缓存层）
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# 复制静态资源目录（前端构建产物）
COPY static ./static

# 复制后端源代码
COPY backend/ .

# 暴露端口（容器内）
EXPOSE 8010

# 环境变量配置
ENV PYTHONUNBUFFERED=1      # Python 输出不缓冲（实时查看日志）
ENV PORT=8010               # 服务端口

# 启动命令
CMD ["python", "main.py"]
```

**frontend.Dockerfile:**

```dockerfile
# 第一阶段：构建前端（使用 Node Alpine 轻量级镜像）
FROM node:18-alpine AS builder

WORKDIR /app

# 复制依赖文件（利用 Docker 缓存）
COPY package*.json ./
RUN npm install

# 复制源码
COPY . .

# 构建生产版本
RUN npm run build

# 第二阶段：使用 Nginx 运行
FROM nginx:alpine

# 从构建阶段复制前端构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口（容器内）
EXPOSE 9010

# 启动 Nginx（前台运行）
CMD ["nginx", "-g", "daemon off;"]
```

**backend/.env:**

```bash
# ==================== 数据库配置 ====================
DATABASE_URL="sqlite:///./test.db"

# ==================== 应用配置 ====================
APP_NAME="PathOptix API"
APP_VERSION="1.0.0"
DEBUG=False                  # 生产环境必须为 False

# ==================== 认证配置 ====================
SECRET_KEY="your-production-secret-key-change-this"    # 生产环境必须修改！
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=30

# ==================== CORS 配置 ====================
# 注意：生产环境需要填写实际的域名/IP
BACKEND_CORS_ORIGINS=["http://localhost:9010","http://127.0.0.1:9010"]
```

**.env.production:**

```bash
VITE_API_BASE_URL=/api
```

#### 3.2.3 部署命令

**步骤 1：进入项目目录**

```bash
cd c:\doc\project\ljy-web
```

**步骤 2：检查目录结构**

```bash
# 确认关键文件存在
ls -la docker-compose.yml
ls -la frontend.Dockerfile
ls -la backend.Dockerfile
ls -la nginx.conf
```

**步骤 3：构建并启动服务**

```bash
# 构建镜像（--no-cache 可选，用于完全重新构建）
docker compose build

# 后台启动所有服务
docker compose up -d

# 查看启动日志（不带 -d 参数）
docker compose up

# 如需重新构建并启动
docker compose up --build -d
```

**步骤 4：验证服务状态**

```bash
# 查看运行中的容器
docker compose ps

# 查看所有容器（包括已停止）
docker compose ps -a

# 查看容器日志
docker compose logs backend
docker compose logs frontend

# 实时跟踪日志
docker compose logs -f
```

**步骤 5：访问服务**

| 服务 | 访问地址 |
|------|----------|
| 前端页面 | http://localhost:9010 |
| API 文档 (Swagger) | http://localhost:9010/docs |
| API 文档 (ReDoc) | http://localhost:9010/redoc |
| 后端健康检查 | http://localhost:9010/api/health |

**步骤 6：停止服务**

```bash
# 停止服务（保留容器）
docker compose stop

# 停止并删除容器
docker compose down

# 停止并删除容器、数据卷
docker compose down -v

# 完全清理（删除镜像）
docker compose down --rmi local
```

---

### 3.3 方案二：前后端融合部署（已废弃）

> ⚠️ **注意**：此方案仅作历史参考，不推荐用于生产环境。

此方案使用单一的 `Dockerfile`，将前端构建产物嵌入后端容器中，由 FastAPI 直接提供静态文件服务。

#### 3.3.1 Dockerfile 结构

```dockerfile
# ==================== 第一阶段：构建前端 ====================
FROM node:18-alpine AS frontend

WORKDIR /app

# 复制依赖文件
COPY package*.json ./
RUN npm install

# 复制源码
COPY . .

# 构建前端
RUN npm run build

# ==================== 第二阶段：构建后端 ====================
FROM python:3.10-slim

WORKDIR /app

# 安装后端依赖
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# 复制后端源码
COPY backend/ .

# 复制前端构建产物到静态文件目录
COPY --from=frontend /app/dist ./static

# 暴露端口
EXPOSE 8010

# 环境变量
ENV PYTHONUNBUFFERED=1

# 启动后端
CMD ["python", "main.py"]
```

#### 3.3.2 部署命令

```bash
# 构建镜像
docker build -t ljy-web-all:latest .

# 运行容器
docker run -d \
  --name ljy-web-all \
  -p 8010:8010 \
  -e DEBUG=False \
  ljy-web-all:latest

# 验证
curl http://localhost:8010/api/health

# 访问前端
curl http://localhost:8010
```

---

### 3.4 简化开发模式

如果只需要快速启动后端服务进行测试，可以使用简化版 Dockerfile。

**backend/simple_server.py:**

```python
from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/api/health")
async def health():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8005)
```

**backend/Dockerfile.simple:**

```dockerfile
FROM python:3.10-slim

WORKDIR /app

RUN pip install --upgrade pip && \
    pip install fastapi uvicorn

COPY . .

EXPOSE 8005

CMD ["python", "simple_server.py"]
```

**启动命令：**

```bash
cd backend

# 构建
docker build -f Dockerfile.simple -t ljy-web-simple:latest .

# 运行
docker run -d --name ljy-web-simple -p 8005:8005 ljy-web-simple:latest

# 验证
curl http://localhost:8005/api/health
```

---

## 四、生产环境配置

### 4.1 修改必要配置

#### 4.1.1 修改 SECRET_KEY

⚠️ **重要**：生产环境必须修改默认的 `SECRET_KEY`，否则存在安全风险。

```bash
# 生成随机密钥（Linux/macOS）
python -c "import secrets; print(secrets.token_hex(32))"

# 或使用 openssl
openssl rand -hex 32
```

修改 `backend/.env`：

```bash
SECRET_KEY="生成的随机密钥"
```

#### 4.1.2 配置 CORS 域名

将 `backend/.env` 中的 `BACKEND_CORS_ORIGINS` 修改为实际的前端域名：

```bash
BACKEND_CORS_ORIGINS=["https://your-domain.com","https://www.your-domain.com"]
```

### 4.2 数据持久化

#### 4.2.1 挂载数据卷

在 `docker-compose.yml` 中添加数据卷：

```yaml
services:
  backend:
    # ... 其他配置
    volumes:
      - backend-data:/app/data

volumes:
  backend-data:
    driver: local
```

#### 4.2.2 备份数据库

```bash
# 进入容器
docker exec -it ljy-web-backend /bin/bash

# 备份 SQLite 数据库
cp /app/test.db /app/data/backup_$(date +%Y%m%d_%H%M%S).db

# 退出容器
exit

# 从容器复制到宿主机
docker cp ljy-web-backend:/app/data/backup_*.db ./
```

### 4.3 日志管理

#### 4.3.1 配置日志输出

修改 `docker-compose.yml`：

```yaml
services:
  backend:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"      # 单个日志文件最大 10MB
        max-file: "3"        # 最多保留 3 个文件

  frontend:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

#### 4.3.2 查看日志

```bash
# 查看后端所有日志
docker compose logs backend

# 查看最近 100 行
docker compose logs --tail 100 backend

# 实时跟踪
docker compose logs -f backend

# 按时间过滤
docker compose logs --since "2024-01-01" backend
```

---

## 五、常见问题排查

### 5.1 容器无法启动

```bash
# 1. 检查 Docker 服务状态
sudo systemctl status docker

# 2. 查看详细错误日志
docker compose logs --tail 50

# 3. 检查端口占用
netstat -ano | findstr "9010"
netstat -ano | findstr "8010"

# 4. 清理资源后重新启动
docker compose down
docker system prune -f
docker compose up -d
```

### 5.2 前端无法访问后端 API

```bash
# 1. 检查后端容器是否运行
docker compose ps backend

# 2. 在前端容器内测试网络
docker exec -it ljy-web-frontend /bin/sh
wget -qO- http://backend:8010/api/health
exit

# 3. 检查 Nginx 配置是否正确
docker exec ljy-web-frontend cat /etc/nginx/conf.d/default.conf
```

### 5.3 端口冲突

如果 9010 或 8010 端口被占用，可修改 `docker-compose.yml` 中的端口映射：

```yaml
services:
  backend:
    ports:
      - "8011:8010"    # 宿主机 8011 映射到容器 8010

  frontend:
    ports:
      - "9011:9010"    # 宿主机 9011 映射到容器 9010
```

### 5.4 数据库连接错误

```bash
# 检查数据库文件是否存在
docker exec ljy-web-backend ls -la /app/*.db

# 手动初始化数据库
docker exec -it ljy-web-backend python init_db.py
```

---

## 六、完整部署流程脚本

### 6.1 一键部署脚本 (Linux/macOS)

创建 `deploy.sh`：

```bash
#!/bin/bash

set -e

echo "=========================================="
echo "  LJY-Web Docker 全流程部署脚本"
echo "=========================================="

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 进入项目目录
cd "$(dirname "$0")"

# 步骤 1：检查 Docker
echo -e "\n${YELLOW}[1/5] 检查 Docker 环境...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}错误：Docker 未安装${NC}"
    exit 1
fi
docker --version
docker compose version

# 步骤 2：检查端口
echo -e "\n${YELLOW}[2/5] 检查端口占用...${NC}"
if netstat -tuln | grep -q ":9010 "; then
    echo -e "${RED}警告：端口 9010 已被占用${NC}"
fi
if netstat -tuln | grep -q ":8010 "; then
    echo -e "${RED}警告：端口 8010 已被占用${NC}"
fi

# 步骤 3：清理旧容器
echo -e "\n${YELLOW}[3/5] 清理旧容器和镜像...${NC}"
docker compose down --remove-orphans 2>/dev/null || true

# 步骤 4：构建镜像
echo -e "\n${YELLOW}[4/5] 构建 Docker 镜像...${NC}"
docker compose build --no-cache

# 步骤 5：启动服务
echo -e "\n${YELLOW}[5/5] 启动服务...${NC}"
docker compose up -d

# 等待服务启动
echo -e "\n${YELLOW}等待服务启动...${NC}"
sleep 10

# 验证
echo -e "\n${YELLOW}验证服务状态...${NC}"
docker compose ps

# 健康检查
echo -e "\n${YELLOW}健康检查...${NC}"
if curl -sf http://localhost:9010/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓ 后端服务正常${NC}"
else
    echo -e "${RED}✗ 后端服务异常${NC}"
fi

echo -e "\n=========================================="
echo -e "${GREEN}部署完成！${NC}"
echo -e "前端地址: http://localhost:9010"
echo -e "API 文档: http://localhost:9010/docs"
echo "=========================================="
```

使用方式：

```bash
chmod +x deploy.sh
./deploy.sh
```

### 6.2 一键部署脚本 (Windows PowerShell)

创建 `deploy.ps1`：

```powershell
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  LJY-Web Docker 全流程部署脚本" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 检查 Docker
Write-Host "`n[1/5] 检查 Docker 环境..." -ForegroundColor Yellow
try {
    docker --version
    docker compose version
} catch {
    Write-Host "错误：Docker 未安装" -ForegroundColor Red
    exit 1
}

# 检查端口
Write-Host "`n[2/5] 检查端口占用..." -ForegroundColor Yellow
$ports = @(9010, 8010)
foreach ($port in $ports) {
    $占用 = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($占用) {
        Write-Host "警告：端口 $port 已被占用" -ForegroundColor Red
    }
}

# 清理旧容器
Write-Host "`n[3/5] 清理旧容器..." -ForegroundColor Yellow
docker compose down --remove-orphans 2>$null

# 构建镜像
Write-Host "`n[4/5] 构建 Docker 镜像..." -ForegroundColor Yellow
docker compose build --no-cache

# 启动服务
Write-Host "`n[5/5] 启动服务..." -ForegroundColor Yellow
docker compose up -d

# 等待启动
Start-Sleep -Seconds 10

# 验证
Write-Host "`n验证服务状态..." -ForegroundColor Yellow
docker compose ps

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "部署完成！" -ForegroundColor Green
Write-Host "前端地址: http://localhost:9010" -ForegroundColor Green
Write-Host "API 文档: http://localhost:9010/docs" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
```

使用方式：

```powershell
.\deploy.ps1
```

---

## 七、快速参考命令

```bash
# ==================== 日常操作 ====================
docker compose up -d              # 启动服务（后台）
docker compose stop               # 停止服务
docker compose down               # 停止并删除容器
docker compose restart            # 重启服务

# ==================== 构建操作 ====================
docker compose build              # 构建镜像
docker compose build --no-cache   # 无缓存构建
docker compose up --build         # 重新构建并启动

# ==================== 日志操作 ====================
docker compose logs               # 查看日志
docker compose logs -f            # 实时跟踪日志
docker compose logs --tail 100    # 查看最近 100 行

# ==================== 调试操作 ====================
docker compose ps                 # 查看容器状态
docker exec -it <容器名> /bin/bash   # 进入容器 bash
docker exec -it <容器名> /bin/sh      # 进入容器 sh（轻量）
docker inspect <容器名>           # 查看容器详细信息

# ==================== 清理操作 ====================
docker system prune              # 清理未使用的镜像、容器、网络
docker system prune -a           # 清理所有未使用对象
docker volume prune              # 清理未使用的数据卷
```

---

## 八、架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                         Docker Host                            │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    ljy-web-network                       │   │
│  │                                                          │   │
│  │   ┌──────────────────┐     ┌────────────────────────┐   │   │
│  │   │   Nginx (Alpine) │     │   FastAPI (Python)     │   │   │
│  │   │   ljy-web-frontend│     │   ljy-web-backend      │   │   │
│  │   │                   │     │                        │   │   │
│  │   │  Port: 9010      │     │  Port: 8010            │   │   │
│  │   │  (exposed)       │     │  (exposed)             │   │   │
│  │   │                   │     │                        │   │   │
│  │   │  ┌─────────────┐  │     │  ┌──────────────────┐  │   │   │
│  │   │  │  React App │  │◄────┼──│  REST API       │  │   │   │
│  │   │  │  (dist/)   │  │proxy│  │  /api/*         │  │   │   │
│  │   │  └─────────────┘  │     │  └──────────────────┘  │   │   │
│  │   │                   │     │                        │   │   │
│  │   │  ┌─────────────┐  │     │  ┌──────────────────┐  │   │   │
│  │   │  │ nginx.conf │  │     │  │  SQLite DB      │  │   │   │
│  │   │  │  /static   │  │◄────┼──│  test.db        │  │   │   │
│  │   │  │  /api      │  │     │  │                  │  │   │   │
│  │   │  └─────────────┘  │     │  └──────────────────┘  │   │   │
│  │   └──────────────────┘     └────────────────────────┘   │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │   External Clients    │
                   │   http://localhost:9010│
                   └──────────────────────┘
```

---

**文档版本**: v1.0
**生成日期**: 2026-04-18
**适用项目**: ljy-web (PathOptix Dashboard)
