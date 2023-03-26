from fastapi import FastAPI
from auth import models
from auth.database import engine
import sys
import uvicorn
from auth.router import crud, authentication
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(engine)


app = FastAPI()    

app.include_router(crud.router)
app.include_router(authentication.router)

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

if __name__ == '__main__':
    # print(sys.path)
    uvicorn.run("main:app", host= "127.0.0.1", port=5000, reload=True, access_log=False)