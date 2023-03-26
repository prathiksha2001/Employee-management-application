from pydantic import BaseModel
from datetime import date

class EmployeeProfile(BaseModel):    
    firstname : str
    lastname : str
    gender : str
    dob : date
    contact : str
    

class Address(BaseModel):   
    street : str
    city: str
    state : str
    zipcode : str
    
class TokenData(BaseModel):
    email : str
    role : str
    emp_id : int

class Leave(BaseModel):    
    leave_type_id : int
    leave_policy_id : int
    start_date : date
    end_date : date
    reason : str
    manager_id : int
    
class LeavePayLoad(Leave):
    employee_id : int
    manager_id : int
    class Config():
        orm_mode = True
