from pydantic import BaseModel
from datetime import date

class Task(BaseModel):
    title : str
    description : str
    emp_id : int
    due_date : date
                     

class EmployeeTaskOut(BaseModel):
    id : int
    title : str
    description : str
    due_date : date
    status : str                   
    created_at : date
    updated_at : date
    class Config():
        orm_mode = True

class ManagerTaskOut(BaseModel):
    id : int
    emp_id : int
    title : str
    description : str
    due_date : date
    status : str                   
    created_at : date
    updated_at : date
    class Config():
        orm_mode = True

class UpdateTask(BaseModel):
    id : int
    status : str

class TokenData(BaseModel):
    email : str
    role : str
    emp_id : int