from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine, Base
from .routes.lead_routes import router as lead_router
from .routes.auth_routes import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Lead Management System"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(lead_router)
app.include_router(auth_router)


@app.get("/")
def home():
    return {
        "message": "Lead Management System API"
    }
