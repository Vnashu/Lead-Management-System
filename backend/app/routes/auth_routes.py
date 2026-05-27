from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ..auth import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/login")
def login(user: LoginRequest):

    # Static credentials for assessment
    if user.username != "admin" or user.password != "admin123":
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    token = create_access_token(
        data={"sub": user.username}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }