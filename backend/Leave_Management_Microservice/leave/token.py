from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Union
from . import schemas
from fastapi import HTTPException, status

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"

def verify_token(token : str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        role : str = payload.get("role")
        emp_id : int = payload.get("emp_id")
        if email is None:
            return None
        token_data = schemas.TokenData(email=email, role=role, emp_id=emp_id)
        return token_data
    except JWTError:
        credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
        )
        raise credentials_exception
    
def tokensplit(authorization: str):
    token_type, token = authorization.strip("\"").split()
    if token_type != "Bearer":
        raise HTTPException(status_code=401, detail="Invalid Token")    
    return verify_token(token)