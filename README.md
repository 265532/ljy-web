# PathOptix Dashboard

现代化的物流路径优化管理系统。

## 项目结构

```
ljy-web/
├── src/                    # 前端源码
│   ├── components/         # React组件
│   │   ├── ui/            # 基础UI组件 (ChartCard, StatCard, MapWidget, AlertPanel)
│   │   ├── layout/        # 布局组件 (Header, Sidebar)
│   │   └── features/      # 业务特性模块
│   │       ├── auth/          # 认证模块
│   │       ├── dashboard/     # 仪表板模块
│   │       ├── orders/        # 订单管理模块
│   │       ├── routing/       # 路线优化模块
│   │       ├── training/      # 训练优化模块
│   │       ├── carbon/        # 碳监测模块
│   │       ├── compliance/    # 合规安全模块
│   │       ├── customer-service/ # 客户服务模块
│   │       └── settings/      # 系统设置模块
│   ├── services/          # API服务层
│   ├── hooks/             # 自定义Hooks (预留)
│   ├── stores/            # 状态管理 (预留)
│   ├── types/             # TypeScript类型定义
│   ├── constants/         # 常量定义 (预留)
│   ├── utils/             # 工具函数
│   └── assets/            # 应用资源
├── backend/               # Python FastAPI后端
├── public/                # 静态资源
├── tests/                 # 测试文件
├── deploy/                # 部署配置
└── docs/                  # 项目文档
```

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 技术栈

- **前端**: React 19 + TypeScript + Vite 6
- **UI库**: Lucide Icons + Recharts + Tailwind CSS
- **后端**: Python FastAPI + SQLAlchemy
- **部署**: Docker + Nginx

## 路径别名

项目配置了以下路径别名，推荐在导入时使用：

| 别名 | 路径 | 用途 |
|------|------|------|
| `@/` | `./src/` | 源码根目录 |
| `@components/` | `./src/components/` | 组件目录 |
| `@features/` | `./src/components/features/` | 业务特性模块 |
| `@ui/` | `./src/components/ui/` | 基础UI组件 |
| `@layout/` | `./src/components/layout/` | 布局组件 |
| `@services/` | `./src/services/` | API服务层 |
| `@hooks/` | `./src/hooks/` | 自定义Hooks |
| `@types/` | `./src/types/` | 类型定义 |
| `@utils/` | `./src/utils/` | 工具函数 |

## 文档

- [结构审查报告](./docs/FILE_STRUCTURE_AUDIT_REPORT.md)
- [结构迁移方案](./docs/FILE_STRUCTURE_MIGRATION_PLAN.md)
- [全面审查报告](./docs/PROJECT_AUDIT_REPORT.md)
- [开发计划](./docs/DEVELOPMENT_PLAN.md)
