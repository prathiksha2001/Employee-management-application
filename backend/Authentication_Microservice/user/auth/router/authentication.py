from fastapi import APIRouter, Depends, HTTPException, status
from .. import schemas, models,token
from sqlalchemy.orm import Session
from ..database import get_db
from ..hashing import Hash
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from ..hashing import Hash

router = APIRouter()


@router.post('/login')
def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
      
    user = db.query(models.UserCredentials).filter(models.UserCredentials.email==request.username).first()    
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Incorrect email")
    if not Hash.verify_password(request.password, user.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Incorrect email or password")
    
    role = db.query(models.Role).filter(models.Role.id == user.role_id).first()
    access_token = token.create_access_token(data={"sub": request.username, "role": role.name, "emp_id": user.emp_id})

    response = JSONResponse({"access_token": access_token, "token_type": "bearer"})
    response.set_cookie(key="session_token", value=access_token, httponly=True)
    return response


# @router.post('/login')
# def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
#     encrypted_username = Hash.bcrypt(request.username)       
#     user = db.query(models.UserCredentials).filter(models.UserCredentials.email==encrypted_username).first()    
#     if not user:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Incorrect username")
#     if not Hash.verify(request.password, user.password):
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Incorrect username or password")
    
#     role = db.query(models.Role).filter(models.Role.id == user.role_id).first()
#     access_token = token.create_access_token(data={"sub": request.username,"role":role.name, "emp_id": user.emp_id})

#     response = JSONResponse({"access_token": access_token, "token_type": "bearer"})
#     response.set_cookie(key="session_token", value=access_token, httponly=True)
#     return response

# @router.post('/login', tags=["Authentication"])
# def login(request : OAuth2PasswordRequestForm = Depends(), db : Session = Depends(get_db)):
#     user = db.query(models.UserCredentials).filter(models.UserCredentials.email==request.username).first()
#     if not user:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Incorrect username or password")
#     if not Hash.verify_password(request.password, user.password):
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Incorrect username or password")
    
#     access_token = token.create_access_token(data={"sub": user.email,"role":user.role, "emp_id": user.emp_id})
#     # return {"access_token": access_token, "token_type": "bearer"}
#     # response = JSONResponse({"access_token": access_token, "token_type": "bearer"})
#     # response.set_cookie(key="session_token", value=access_token, httponly=True)
#     response = JSONResponse({"access_token": access_token, "token_type": "bearer"})
#     response.set_cookie(key="session_token", value=access_token, httponly=True)
#     return response
    