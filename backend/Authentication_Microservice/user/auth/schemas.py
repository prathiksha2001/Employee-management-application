from pydantic import BaseModel

class UserCredentials(BaseModel):
    emp_id: int    
    email : str
    password : str
    role : str
    class Config():
        orm_mode = True

class Role(BaseModel):
    name : str


class TokenData(BaseModel):
    email : str
    role : str
    emp_id : int
# class AdminCredentials(BaseModel):
#     username : str
#     password : str
#     role : str

# class Token(BaseModel):
#     user_id : int
#     access_token : str
#     token_type : str