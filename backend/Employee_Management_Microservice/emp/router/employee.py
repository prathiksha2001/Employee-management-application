from fastapi import APIRouter, Depends, HTTPException, Header, status
from emp.database import get_db
from emp import schemas, models,token
from sqlalchemy.orm import Session
import requests, json

router = APIRouter(prefix="/employee", tags=["Employee"])


@router.post('/')
def addProfile(request: schemas.EmployeeProfile , db : Session = Depends(get_db),authorization: str = Header()):
    token_data = token.tokensplit(authorization)
    if not isinstance(token_data,schemas.TokenData):
        raise token_data    
    new_profile = models.EmployeeProfile(emp_id = token_data.emp_id, firstname = request.firstname,
                                         lastname = request.lastname, gender=request.gender,
                                         dob = request.dob, contact = request.contact)
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    return new_profile

@router.get('/{emp_id}')
def getProfile(emp_id : int,db : Session = Depends(get_db),authorization: str = Header()):
    new_profile = db.query(models.EmployeeProfile).filter(models.EmployeeProfile.emp_id == emp_id).first()
    if not new_profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="employee detail not found")

    return new_profile
    
@router.put('/{emp_id}')
def profileUpdate(emp_id : int , request : schemas.EmployeeProfile, db : Session = Depends(get_db),authorization: str = Header()):
    token_data = token.tokensplit(authorization)
    if not isinstance(token_data,schemas.TokenData):
        raise token_data
    update_profile = db.query(models.EmployeeProfile).filter(models.EmployeeProfile.emp_id==emp_id).first()
    if not update_profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"employee with a id {emp_id} not found")
    update_profile.firstname = request.firstname
    update_profile.lastname = request.lastname
    update_profile.gender = request.gender
    update_profile.dob = request.dob
    update_profile.contact = request.contact
    db.commit()
    return "profile updated successfully"



@router.post('/apply_leave')
def applyLeave(request:schemas.Leave, db: Session = Depends(get_db), authorization : str = Header()):
    token_data = token.tokensplit(authorization)
    if not isinstance(token_data,schemas.TokenData): 
        raise token_data   
    
    response = requests.get(f"http://127.0.0.1:8000/manager/{token_data.emp_id}").json()
    
    headers = {
        'Authorization': authorization,
        'Content-Type': 'application/json'        
    }

    # Create a new dictionary with the serializable fields of the request object
    leave_application = {
        "leave_policy_id": request.leave_policy_id,
        "leave_type_id" : request.leave_type_id,
        "start_date" : request.start_date.isoformat(),
        "end_date": request.end_date.isoformat(),
        "reason": request.reason,
    }

    # Add additional fields to the dictionary
    leave_application["emp_id"] = token_data.emp_id
    leave_application["manager_id"] = response['manager_id']

    # Serialize the dictionary to JSON
    json_data = json.dumps(leave_application)

    response = requests.post("http://127.0.0.1:5002/leave-application", headers=headers, data=json_data)
    return response.json()

# @router.get("/view-leave-application/{id}")
# def viewLeaveForm(id : int, db : Session = Depends(get_db), authorization : str = Header()):
#     token_data = token.tokensplit(authorization)
#     if not isinstance(token_data,schemas.TokenData): 
#         raise token_data
#     headers = {
#         'Authorization': authorization,
#         'Content-Type': 'application/json'        
#     }
#     return requests.get(f"http://127.0.0.1:5002/leave-application/{token_data.emp_id}", headers=headers).json()
