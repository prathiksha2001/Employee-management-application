from fastapi import FastAPI
import uvicorn
from tasks.router import employee, manager
from tasks import models
from tasks.database import engine
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(engine)

app = FastAPI()

app.include_router(employee.router)
app.include_router(manager.router)

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
    uvicorn.run("main:app", host= "127.0.0.1", port=5005, reload = True, access_log = False)