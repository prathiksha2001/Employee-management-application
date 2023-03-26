from fastapi import FastAPI
import uvicorn
from emp.router import employee, address
from emp import models
from emp.database import engine
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

models.Base.metadata.create_all(engine)

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

app.include_router(employee.router)
app.include_router(address.router)


if __name__ == '__main__':
    uvicorn.run("main:app", host="127.0.0.1", port=8002, reload = True, access_log = False)