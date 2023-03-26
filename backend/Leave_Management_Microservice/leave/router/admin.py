from fastapi import APIRouter,Depends, HTTPException, status, Header
from leave.database import get_db
from sqlalchemy.orm import Session
from leave import schemas, models, token

router = APIRouter(tags=['Admin'])


@router.post('/leavetype')
def addLeaveType(request: schemas.LeaveType, db: Session = Depends(get_db), authorization : str = Header()):
    
    token_data = token.tokensplit(authorization)
    if not isinstance(token_data, schemas.TokenData):
        raise token_data
    if token_data.role != 'admin':
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"you're not allowed to access this resourse")
    
    new_leave_type = models.LeaveType(name = request.name, max_days = request.max_days )
    db.add(new_leave_type)
    db.commit()
    db.refresh(new_leave_type)
    return new_leave_type

@router.post('/add-leave-balance')
def addLeavePolicy(request: schemas.EmployeeLeaveBalance, db: Session = Depends(get_db)):
    # , authorization : str = Header()
    # token_data = token.tokensplit(authorization)
    # if not isinstance(token_data, schemas.TokenData):
    #     raise token_data
    # if token_data.role != 'admin':
    #     raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"you're not allowed to access this resourse")
    
    leavetypes = db.query(models.LeaveType).all()
    for leavetype in leavetypes:
        new_leavetype = models.LeaveBalance(emp_id = request.emp_id, leave_type_id = leavetype.id,
                                            leave_balance = leavetype.max_days)
        db.add(new_leavetype)
        db.commit()
        db.refresh(new_leavetype)
    return "User Created Successfully"

@router.get('/leavebalance/{emp_id}', response_model=list[schemas.LeaveBalanceResponse])
def leavebalance( emp_id : int, db: Session = Depends(get_db), authorization : str = Header()):
    
    token_data = token.tokensplit(authorization)

    if not isinstance(token_data, schemas.TokenData):
        raise token_data
    
    user_leave_balance = db.query(models.LeaveType.name.label("leave_type"), models.LeaveBalance.leave_balance)\
        .join(models.LeaveBalance.type).filter(models.LeaveBalance.emp_id == emp_id).all()
    
    if not user_leave_balance:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Record not found")
    
    return user_leave_balance