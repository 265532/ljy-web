from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from app.models.database import get_db
from app.models.order import Order
from pydantic import BaseModel
import re
import httpx

router = APIRouter(prefix="/chat", tags=["chat"])

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    order_id: str = None

class ProxyRequest(BaseModel):
    url: str
    method: str = "GET"
    headers: dict = {}
    body: dict = None

@router.post("/proxy")
async def proxy_request(request: ProxyRequest):
    try:
        async with httpx.AsyncClient() as client:
            if request.method == "GET":
                response = await client.get(request.url, headers=request.headers, timeout=30.0)
            elif request.method == "POST":
                response = await client.post(request.url, json=request.body, headers=request.headers, timeout=30.0)
            else:
                raise HTTPException(status_code=400, detail="Unsupported method")

            return Response(
                content=response.content,
                status_code=response.status_code,
                headers=dict(response.headers)
            )
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Proxy error: {str(e)}")

class LogisticsChatAgent:
    def __init__(self, db):
        self.db = db

    def extract_order_id(self, message):
        order_id_pattern = r'(ORD-\d+|CN\d+)'
        matches = re.findall(order_id_pattern, message)
        return matches[0] if matches else None

    def get_order_info(self, order_id):
        order = self.db.query(Order).filter(Order.id == order_id).first()
        return order

    def generate_response(self, message):
        order_id = self.extract_order_id(message)

        if order_id:
            order = self.get_order_info(order_id)

            if order:
                response = f"系统已为您定位订单 {order_id}，当前状态为：{order.status}，客户名称：{order.customer_name}，交易金额：{order.amount}。"
                return ChatResponse(response=response, order_id=order_id)
            else:
                response = f"抱歉，未找到订单编号 {order_id} 的信息。请检查订单编号是否正确。"
                return ChatResponse(response=response)
        else:
            if any(keyword in message.lower() for keyword in ["你好", "您好", "hi", "hello"]):
                response = "您好！我是您的智能物流管家。您可以直接输入订单号或问题关键词，如'查询订单状态'、'物流信息'等。"
            elif any(keyword in message.lower() for keyword in ["状态", "物流", "运输", "位置"]):
                response = "请提供订单编号，我可以为您查询详细的物流信息和状态。"
            elif any(keyword in message.lower() for keyword in ["帮助", "使用"]):
                response = "您可以通过以下方式与我交互：\n1. 输入订单编号查询状态\n2. 输入'物流信息'查询运输详情\n3. 输入'帮助'查看使用指南"
            else:
                response = "抱歉，我不太理解您的问题。您可以输入订单编号查询状态，或输入'帮助'查看使用指南。"

            return ChatResponse(response=response)

@router.post("/", response_model=ChatResponse)
def chat(request: ChatRequest, db: Session = Depends(get_db)):
    agent = LogisticsChatAgent(db)
    return agent.generate_response(request.message)
