from fastapi import APIRouter
from app.api import auth, chat, order

# 创建主路由
router = APIRouter()

# 包含认证路由
router.include_router(auth.router)
# 包含聊天路由
router.include_router(chat.router)
# 包含订单路由
router.include_router(order.router)

# 健康检查路由
@router.get("/health")
async def health_check():
    return {"status": "ok"}
