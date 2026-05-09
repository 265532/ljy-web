from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional, List
from pydantic import BaseModel
from app.models.database import get_db
from app.models.order import Order

router = APIRouter(prefix="/orders", tags=["orders"])

class OrderResponse(BaseModel):
    id: str
    customer_name: str
    date: str
    amount: str
    status: str
    status_color: str

    class Config:
        from_attributes = True

class OrderCreate(BaseModel):
    id: str
    customer_name: str
    date: str
    amount: str
    status: str
    status_color: str

class OrderListResponse(BaseModel):
    orders: List[OrderResponse]
    total: int

class MatchCapacityResponse(BaseModel):
    success: bool
    matched: bool

class CapacityAnalysisResponse(BaseModel):
    capacity: float
    utilization: float

class CarbonEmissionResponse(BaseModel):
    carbon: float
    unit: str

@router.get("/", response_model=OrderListResponse)
async def get_orders(
    keyword: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Order)

    if keyword:
        query = query.filter(
            (Order.id.contains(keyword)) |
            (Order.customer_name.contains(keyword))
        )

    if status:
        query = query.filter(Order.status == status)

    orders = query.all()
    return {"orders": orders, "total": len(orders)}

@router.get("", response_model=OrderListResponse)
async def get_orders_no_slash(
    keyword: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    return await get_orders(keyword, status, db)

@router.get("/{order_id}", response_model=OrderResponse)
async def get_order(order_id: str, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.post("/", response_model=OrderResponse)
async def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    db_order = Order(**order.model_dump())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

@router.put("/{order_id}", response_model=OrderResponse)
async def update_order(order_id: str, order: OrderCreate, db: Session = Depends(get_db)):
    db_order = db.query(Order).filter(Order.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")

    for key, value in order.model_dump().items():
        setattr(db_order, key, value)

    db.commit()
    db.refresh(db_order)
    return db_order

@router.delete("/{order_id}")
async def delete_order(order_id: str, db: Session = Depends(get_db)):
    db_order = db.query(Order).filter(Order.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")

    db.delete(db_order)
    db.commit()
    return {"message": "Order deleted successfully"}

@router.post("/{order_id}/match-capacity", response_model=MatchCapacityResponse)
async def match_capacity(order_id: str, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    return {"success": True, "matched": True}

@router.get("/{order_id}/capacity-analysis", response_model=CapacityAnalysisResponse)
async def analyze_capacity(order_id: str, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    return {"capacity": 100.0, "utilization": 75.5}

@router.get("/{order_id}/carbon", response_model=CarbonEmissionResponse)
async def get_carbon_emission(order_id: str, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    return {"carbon": 25.5, "unit": "kg CO2"}