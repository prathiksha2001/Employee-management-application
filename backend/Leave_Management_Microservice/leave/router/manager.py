from fastapi import APIRouter, Depends, HTTPException, Header, status
from sqlalchemy.orm import Session
from leave.database import get_db
from leave import schemas, models, token

router = APIRouter(prefix="/leave-applications-manager", tags=['Manager'])

@router.put("/{leave_id}")
def update_leave_application(leave_id: int, request: schemas.StatusUpdate, db: Session = Depends(get_db), authorization : str = Header()):
    
    token_data = token.tokensplit(authorization)    
    if not isinstance(token_data, schemas.TokenData):
        raise token_data
    
    if token_data.role != 'manager':
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"you're not allowed to access this resourse")
    
    leave_application = db.query(models.Leave).filter(models.Leave.id == leave_id).first()    
    if not leave_application:
        raise HTTPException(status_code=404, detail="Leave application not found")
    # status = status.strip("\"")
    
    if request.status == 'approved': #, 'rejected']:
         leavebalance_update = db.query(models.LeaveBalance).filter(models.LeaveBalance.leave_type_id == leave_application.leave_type_id,
                                             models.LeaveBalance.emp_id == leave_application.emp_id).first()
                                               
         leavebalance_update.leave_balance -=  (leave_application.end_date - leave_application.start_date).days+1
    leave_application.status = request.status
    db.commit()
    db.refresh(leave_application)
    return f"{request.status.capitalize()} Successfully"

@router.get("/{manager_id}" ,response_model=list[schemas.LeaveOut])
def getLeaveApplications(manager_id : int, db: Session = Depends(get_db), authorization : str = Header()):
    
    token_data = token.tokensplit(authorization)
    
    if not isinstance(token_data, schemas.TokenData):
        raise token_data
    
    if token_data.role != 'manager':
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"you're not allowed to access this resourse")
    
    leave_application_lists = db.query(models.Leave).filter(models.Leave.manager_id == manager_id,models.Leave.status == 'pending').all()
    
    if not leave_application_lists:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail=f"There are currently no pending leave applications for your review")

    return leave_application_lists