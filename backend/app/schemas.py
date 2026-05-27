from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class LeadCreate(BaseModel):
    name: str
    mobile_number: str
    email: str
    source: Optional[str] = None
    status: Optional[str] = "New"


class LeadResponse(LeadCreate):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True