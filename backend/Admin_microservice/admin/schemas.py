from pydantic import BaseModel
from datetime import date
from datetime import date


class Employee(BaseModel):    
    email : str
    password : str    
    designation : str    
    dept_id : int
    doj : date
    user_type : str    

class Manager(BaseModel):
    manager_id : int
    
class ManagerOut(Manager):
    class Config():
        orm_mode = True

class EmployeeOut(BaseModel):
    id : int    
    email : str    
    designation : str    
    department : str
    doj : date
    user_type : str
    
    class Config():
        orm_mode = True

class EmployeeOutM(BaseModel):
    id : int    
    email : str    
    designation : str
    doj : date
    user_type : str
    department_name : str
    class Config():
        orm_mode = True

class Department(BaseModel):    
    name : str
    class Config():
        orm_mode = True

class DepartmentOut(Department):
    id : int
    class Config():
        orm_mode = True
        
class UserCredentials(BaseModel):
    emp_id: int    
    email : str
    password : str
    role : str
    class Config():
        orm_mode = True    


class TokenData(BaseModel):
    email : str
    role : str
    emp_id : int

class Departments(BaseModel):
    id : int    
    email : str    
    designation : str    
    name : str
    doj : date
    user_type : str
    department_id : int
    class Config():
        orm_mode = True

  