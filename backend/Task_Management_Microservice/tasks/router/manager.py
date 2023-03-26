from fastapi import APIRouter, Depends, HTTPException, Header, status
from tasks import schemas, models, token
from tasks.database import get_db
from datetime import date
from sqlalchemy.orm import Session

router = APIRouter(prefix = "/manager/{emp_id}", tags=['Manager'])


@router.post('/add-task')
def assignTask(emp_id : int,request : schemas.Task, db : Session = Depends(get_db), authorization : str = Header()):
    token_data = token.tokensplit(authorization)
    
    if not isinstance(token_data, schemas.TokenData):
        raise token_data
    
    if token_data.role != 'manager':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="you're not allowed to perform this action")

    new_task = models.Task(title = request.title, description = request.description,
                           manager_id = emp_id, emp_id = request.emp_id, due_date = request.due_date,
                           created_at = date.today(), updated_at = date.today(),status = 'pending')
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return "Task has been assigned successfully"


@router.get('/view-task',response_model=list[schemas.ManagerTaskOut])
def viewtaskupdates(emp_id : int, db : Session = Depends(get_db),authorization : str = Header()):
    token_data = token.tokensplit(authorization)
    
    if not isinstance(token_data, schemas.TokenData):
        raise token_data
    
    if token_data.role != 'manager':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="you're not allowed to perform this action")
    
    task_updates = db.query(models.Task).filter(models.Task.manager_id == emp_id).all()    
    if not task_updates:        
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="No task updates found")
    return task_updates