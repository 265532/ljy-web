from datetime import datetime, timedelta
from typing import Optional, Union
from passlib.context import CryptContext
from app.config import settings

# 密码加密上下文 - 使用sha256_crypt作为备份方案
pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")

# 验证密码
def verify_password(plain_password: str, hashed_password: str) -> bool:
    # 截断密码以避免长度限制
    truncated_password = plain_password[:72]
    return pwd_context.verify(truncated_password, hashed_password)

# 获取密码哈希
def get_password_hash(password: str) -> str:
    # 截断密码以避免长度限制
    truncated_password = password[:72]
    return pwd_context.hash(truncated_password)

# 创建简单的访问令牌（不使用JWT）
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    # 简单返回用户名作为token
    return data.get("sub", "")

# 解码简单的访问令牌（不使用JWT）
def decode_access_token(token: str) -> Optional[dict]:
    # 简单返回包含用户名的字典
    if token:
        return {"sub": token}
    return None
