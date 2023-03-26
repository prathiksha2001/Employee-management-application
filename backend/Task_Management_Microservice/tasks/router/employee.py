from fastapi import APIRouter, Depends, HTTPException, Header, status
from .. import schemas, models, token
from sqlalchemy.orm import Session
from ..database import get_db
from datetime import date

router = APIRouter(prefix = "/employees", tags=['Employee'])

@router.get('/{emp_id}/view-task', response_model=list[schemas.EmployeeTaskOut])
def viewTask(emp_id : int, db : Session = Depends(get_db), authorization : str = Header()):
    token_data = token.tokensplit(authorization)
    
    if not isinstance(token_data, schemas.TokenData):
        raise token_data 
    
    task_list = db.query(models.Task).filter(models.Task.emp_id == emp_id).all()
    
    if not task_list:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
                            detail="No tasks assigned")
    return task_list



@router.put('/{emp_id}/update_task')
def taskUpdate(emp_id : int, request : schemas.UpdateTask, db: Session = Depends(get_db),authorization : str = Header()):
    
    token_data = token.tokensplit(authorization)    
    if not isinstance(token_data, schemas.TokenData):
        raise token_data

    task = db.query(models.Task).filter(models.Task.id == request.id).first()
    task.status = request.status    
    task.updated_at = date.today()
    db.commit()
    return "updated successfully"

