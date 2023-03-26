from fastapi import APIRouter, Depends, status, HTTPException
from .. import schemas, models
from ..database import get_db
from sqlalchemy.orm import Session
from ..hashing import Hash

router = APIRouter()

@router.post('/add_user')
def addUser(request: schemas.UserCredentials, db: Session = Depends(get_db)):
    role = db.query(models.Role).filter(models.Role.name == request.role).first()
    if role is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Role not found")
    
    new_user = models.UserCredentials(
        emp_id=request.emp_id,
        email=request.email,
        password= request.password,
        role_id=role.id
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return "User added successfully"

@router.post('/role')
def addroles(request : schemas.Role, db: Session = Depends(get_db)):
    new_role = models.Role(name = request.name )
    db.add(new_role)
    db.commit()
    db.refresh(new_role)
    return new_role


# @router.post('/add_user')
# def addUser(request: schemas.UserCredentials, db: Session = Depends(get_db)):
#     new_user = models.UserCredentials(emp_id = request.emp_id ,email=request.email,password=request.password,
#                                       role=request.role)
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)
#     return "user added successfully"



