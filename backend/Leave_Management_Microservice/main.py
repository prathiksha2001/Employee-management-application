from fastapi import FastAPI
import uvicorn
from leave import models
from leave.database import engine
from leave.router import employee, admin, manager
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(engine) 

app = FastAPI()

app.include_router(admin.router)
app.include_router(manager.router)
app.include_router(employee.router)

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


if __name__ == "__main__":
    uvicorn.run("main:app", host = "127.0.0.1", port = 5002 , reload = True, access_log = False)