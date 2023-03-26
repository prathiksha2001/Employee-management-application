from pydantic import BaseModel
from datetime import date

class LeaveTypeBase(BaseModel):
    name : str
    class Config():
        orm_mode = True

class LeaveType(LeaveTypeBase):
    max_days: int



class Leave(BaseModel):    
    emp_id : int
    leave_type_id : int
    start_date : date
    end_date : date
    reason : str    


class LeaveOut(BaseModel):
    id : int    
    emp_id : int    
    start_date : date
    end_date : date
    reason : str    
    type : LeaveTypeBase
    class Config():
        orm_mode = True

class EmployeeLeaveBalance(BaseModel):
    emp_id : int

class TokenData(BaseModel):
    email : str
    role : str
    emp_id : int

class StatusUpdate(BaseModel):
    status : str

class LeaveResponse(BaseModel):
    id: int
    emp_id: int
    leave_type: str
    start_date: date
    end_date: date
    reason: str
    status: str
    manager_id: int
    class Config():
        orm_mode = True

class LeaveBalanceResponse(BaseModel):
    leave_type: str
    leave_balance : int
    class Config():
        orm_mode = True