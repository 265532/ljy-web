# 第一阶段：构建前端
FROM node:18-alpine AS frontend

# 设置工作目录
WORKDIR /app

# 复制前端依赖文件
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制前端源代码
COPY . .

# 构建前端
RUN npm run build

# 第二阶段：构建后端
FROM python:3.10-slim

# 设置工作目录
WORKDIR /app

# 复制后端依赖文件
COPY backend/requirements.txt ./

# 安装后端依赖
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt && \
    pip install email-validator

# 复制后端源代码
COPY backend/ .

# 复制前端构建结果到后端静态文件目录
COPY --from=frontend /app/dist ./static

# 复制前端入口文件 (此处无需单独复制未编译前的index.html，避免覆盖 dist 中的index.html)
# COPY --from=frontend /app/index.html ./static/index.html

# 暴露端口
EXPOSE 8010

# 设置环境变量
ENV PYTHONUNBUFFERED=1

# 启动后端服务
CMD ["python", "main.py"]