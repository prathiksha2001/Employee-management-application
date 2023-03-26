from fastapi import APIRouter, Depends, Header, HTTPException,status
from .. import schemas, token, models
from ..database import get_db
from sqlalchemy.orm import Session
from .repository import crud
import requests

router = APIRouter(prefix="/leave-application", tags=['Employee'])


@router.post('/')
def leave(request: schemas.Leave, db: Session = Depends(get_db), authorization : str = Header()):
    
    token_data = token.tokensplit(authorization)

    if not isinstance(token_data, schemas.TokenData):
        raise token_data
    
    no_of_days_leave_applied = (request.end_date - request.start_date).days + 1

    if not crud.check_leave_availability(request.emp_id,no_of_days_leave_applied, request.leave_type_id,db):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Insufficient leave balance")
    response = requests.get(f"http://127.0.0.1:8000/manager/{token_data.emp_id}").json()
    new_leave_application = models.Leave(emp_id = request.emp_id, leave_type_id = request.leave_type_id, start_date = request.start_date,
                                         end_date = request.end_date, reason = request.reason, status = "pending",
                                           manager_id = response['manager_id'])
    db.add(new_leave_application)
    db.commit()
    db.refresh(new_leave_application)
    return "Leave applied successfully"


@router.get("/{id}", response_model=list[schemas.LeaveResponse])
def view_leave_application(id: int, db: Session = Depends(get_db), authorization : str = Header()):
    
    token_data = token.tokensplit(authorization)    
    if not isinstance(token_data, schemas.TokenData):
        raise token_data
    
    leave_applications = (
        db.query(models.Leave.id,models.Leave.emp_id,models.LeaveType.name.label("leave_type"),
            models.Leave.start_date, models.Leave.end_date, models.Leave.reason,
            models.Leave.status, models.Leave.manager_id).\
                join(models.Leave.type).filter(models.Leave.emp_id == id).all()
    )

    if not leave_applications:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Leave application not found")

    return leave_applications
 

    