from fastapi import APIRouter, Depends, Header, HTTPException, status
from emp.database import get_db
from emp import schemas, models, token
from sqlalchemy.orm import Session

router = APIRouter(prefix="/address", tags=['Address'])

@router.post('/')
def addAddress(request : schemas.Address, db : Session = Depends(get_db),authorization: str = Header()):
    token_data = token.tokensplit(authorization)
    if not isinstance(token_data,schemas.TokenData):
        raise token_data 
    new_address = models.Address(street = request.street, city = request.city,state = request.state, 
                                 zipcode = request.zipcode,employee_id = token_data.emp_id)
    db.add(new_address)
    db.commit()
    db.refresh(new_address)
    return new_address    

@router.get('/{emp_id}')
def getAddress(emp_id : int, db : Session = Depends(get_db),authorization: str = Header()):
    token_data = token.tokensplit(authorization)
    
    if not isinstance(token_data,schemas.TokenData): 
        raise token_data
    
    new_address = db.query(models.Address).filter(models.Address.employee_id==emp_id).first()
    if not new_address:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="address not found")
    return new_address

@router.put('/{emp_id}')
def addressUpdate(emp_id : int,request : schemas.Address, db : Session = Depends(get_db),authorization: str = Header()):
    token_data = token.tokensplit(authorization)
    
    if not isinstance(token_data,schemas.TokenData): 
        raise token_data
    
    update_profile = db.query(models.Address).filter(models.Address.employee_id==emp_id).first()
    update_profile.street = request.street
    update_profile.city = request.city
    update_profile.state = request.state
    update_profile.zipcode = request.zipcode
    db.commit()
    return "Address updated Successfully"
