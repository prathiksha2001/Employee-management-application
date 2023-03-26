from fastapi import FastAPI
from . import models
from .database import engine
from .router import admin
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(engine)
app = FastAPI()

app.include_router(admin.router)

origins = [
    "http://localhost",
    "http://localhost:4200",
    "http://127.0.0.1:4200"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
