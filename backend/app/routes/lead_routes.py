from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import datetime

from ..database import SessionLocal
from ..models import Lead
from ..schemas import LeadCreate, LeadResponse

router = APIRouter(
    prefix="/leads",
    tags=["Leads"]
)


# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Create Lead
@router.post("/", response_model=LeadResponse)
def create_lead(
    lead: LeadCreate,
    db: Session = Depends(get_db)
):
    new_lead = Lead(
        name=lead.name,
        mobile_number=lead.mobile_number,
        email=lead.email,
        source=lead.source,
        status=lead.status
    )

    db.add(new_lead)
    db.commit()
    db.refresh(new_lead)

    return new_lead


# Get All Leads with Search, Filter & Pagination
@router.get("/")
def get_leads(
    search: str = Query(None),
    status: str = Query(None),
    page: int = 1,
    limit: int = 5,
    db: Session = Depends(get_db)
):
    query = db.query(Lead)

    # Search by Name
    if search:
        query = query.filter(
            Lead.name.contains(search)
        )

    # Filter by Status
    if status:
        query = query.filter(
            Lead.status == status
        )

    total = query.count()

    leads = query.offset(
        (page - 1) * limit
    ).limit(limit).all()

    return {
        "total": total,
        "page": page,
        "limit": limit,
        "data": leads
    }


# Get Lead By ID
@router.get("/{lead_id}", response_model=LeadResponse)
def get_lead(
    lead_id: int,
    db: Session = Depends(get_db)
):
    lead = db.query(Lead).filter(
        Lead.id == lead_id
    ).first()

    if not lead:
        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    return lead


# Update Lead / Status
@router.put("/{lead_id}")
def update_lead(
    lead_id: int,
    updated_data: dict,
    db: Session = Depends(get_db)
):
    lead = db.query(Lead).filter(
        Lead.id == lead_id
    ).first()

    if not lead:
        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    for key, value in updated_data.items():
        setattr(lead, key, value)

    lead.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(lead)

    return lead


# Delete Lead
@router.delete("/{lead_id}")
def delete_lead(
    lead_id: int,
    db: Session = Depends(get_db)
):
    lead = db.query(Lead).filter(
        Lead.id == lead_id
    ).first()

    if not lead:
        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    db.delete(lead)
    db.commit()

    return {
        "message": "Lead deleted successfully"
    }
