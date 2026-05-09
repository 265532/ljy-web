# 环境配置与API请求策略

## 概述

本项目采用 Vite 环境变量机制实现开发/生产环境的差异化API配置。

## 环境配置

### 文件结构

```
web/
├── .env.development      # 开发环境配置
├── .env.production       # 生产环境配置
└── src/
    └── services/api/
        └── axiosInstance.ts  # API请求封装
```

### 配置内容

| 文件 | `VITE_API_BASE_URL` |
|------|---------------------|
| `.env.development` | `http://localhost:8001` |
| `.env.production` | `http://81.71.129.36:8010` |

## 环境判断逻辑

### Vite 模式

- **开发模式** (`npm run dev`): 自动加载 `.env.development`
- **生产模式** (`npm run build`): 自动加载 `.env.production`

### API请求封装

[axiosInstance.ts](file:///d:\aaa大一资料\比赛资料\ai强化学习\强化学习web端和手机端的资料\ai强化学习 - 副本\ai强化学习02\ai强化学习\web\src\services\api\axiosInstance.ts) 使用 `import.meta.env.VITE_API_BASE_URL` 读取环境变量：

```typescript
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://81.71.129.36:8010';
```

## API请求流程

```
前端组件
    ↓
authApi / orderApi / chatApi (src/services/modules/)
    ↓
httpClient.request() (src/services/api/httpClient.ts)
    ↓
axiosInstance (src/services/api/axiosInstance.ts)
    ↓
${VITE_API_BASE_URL} + /api/xxx
```

## 模块化API管理

| 模块 | 文件 | 功能 |
|------|------|------|
| 认证 | `modules/auth.ts` | 登录、登出、获取用户信息、获取登录背景图 |
| 订单 | `modules/order.ts` | 订单CRUD、运力匹配、碳排监测 |
| 聊天 | `modules/chat.ts` | 发送消息、获取聊天历史 |

## 核心特性

### 请求拦截器
- 自动添加 `Authorization: Bearer <token>` 请求头
- 401错误时自动清除token并跳转登录页

### 响应拦截器
- 统一错误处理
- 超时/网络错误友好提示

### 请求管理
- **取消机制**: 支持按请求key取消和全部取消
- **重试策略**: 可配置重试次数和延迟(默认3次，1秒延迟)
- **加载状态**: 全局加载状态管理

### 特殊请求
图片等二进制数据请求使用 `responseType: 'blob'` 配置。

## 团队使用指南

### 开发环境
```bash
npm run dev  # API请求指向 localhost:8001
```

### 生产构建
```bash
npm run build  # API请求指向 81.71.129.36:8010
```

### 添加新环境配置
1. 创建 `.env.<mode>` 文件
2. 添加 `VITE_API_BASE_URL=<对应的API地址>`
3. 使用 `vite --mode <mode>` 运行

## 注意事项

- 环境变量必须以 `VITE_` 开头才能在客户端代码中访问
- 不要在客户端代码中硬编码API地址
- 敏感信息不要放在环境变量中（前端代码对用户可见）
