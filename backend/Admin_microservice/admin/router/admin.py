from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, Header
from ..database import get_db
from sqlalchemy.orm import Session
from ..hashing import Hash
from .repository import crud
from .. import schemas, models, token
# from fastapi.encoders import jsonable_encoder


router = APIRouter()


@router.get('/employees', response_model=list[schemas.EmployeeOut])
def getEmployeeList(db : Session = Depends(get_db), authorization : str = Header()):
    token_data = token.tokensplit(authorization)
    if not isinstance(token_data, schemas.TokenData):
        raise token_data
    if token.checkAdminAccess(token_data):
        return db.query(models.Employee.id, models.Employee.email, models.Employee.designation, 
                        models.Department.name.label('department'), models.Employee.doj, 
                        models.Employee.user_type).join(models.Department.employees).all()
        
             

@router.post('/employees')
def addEmployee(request: schemas.Employee, db : Session = Depends(get_db),authorization : str = Header()):
    
    token_data = token.tokensplit(authorization)
    if not isinstance(token_data, schemas.TokenData):
        raise token_data
    if token.checkAdminAccess(token_data):

        new_employee = models.Employee(email=request.email,password=Hash.bcrypt(request.password),
                                    designation=request.designation,dept_id=request.dept_id,
                                    doj=request.doj,user_type=request.user_type)
        db.add(new_employee)
        db.commit()
        db.refresh(new_employee)          
        response = crud.addUserInAuth(new_employee, authorization)
        return new_employee
        # , authorization
        
@router.get('/departments',response_model=list[schemas.Departments])
def getdepartments(db : Session = Depends(get_db)):
    depts= db.query(models.Employee.id, models.Employee.email, models.Employee.designation, 
                        models.Department.id.label('department_id'),models.Department.name.label('name'), models.Employee.doj, 
                        models.Employee.user_type).join(models.Department.manager).all()
    return depts
    # return db.query(models.Department).all()

@router.post('/departments')
def adddepartment(request: schemas.Department, db : Session = Depends(get_db),authorization : str = Header()):
    
    token_data = token.tokensplit(authorization)
    if not isinstance(token_data, schemas.TokenData):
        raise token_data
    if token.checkAdminAccess(token_data):
        new_dept = models.Department(name=request.name)
        db.add(new_dept)
        db.commit()
        db.refresh(new_dept)    
        return new_dept

@router.put('/employees/{emp_id}/manager')
def assignManager(emp_id: int, request: schemas.Manager,db:Session=Depends(get_db),
                   authorization : str = Header()):
    
    token_data = token.tokensplit(authorization)

    if not isinstance(token_data, schemas.TokenData):
        raise token_data
    
    if token.checkAdminAccess(token_data):
        employee_record = db.query(models.Employee).filter(models.Employee.id==emp_id).first()

        if not employee_record:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                 detail=f"employee with id {emp_id} not found") 
        manager_record = db.query(models.Employee).filter(models.Employee.id == request.manager_id).first()

        if(employee_record.dept_id != manager_record.dept_id):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Department mismatch") 
              
        employee_record.manager_id = request.manager_id
        db.commit()
        return "Manager Added Successfully"
    
    
@router.get('/employees/{manager_id}',response_model=list[schemas.EmployeeOutM])
def getEmployees(manager_id: int, db: Session = Depends(get_db)):

    results = (
        db.query(models.Employee, models.Department.name)
        .join(models.Department, models.Employee.dept_id == models.Department.id)
        .filter(models.Employee.manager_id == manager_id)
        .all()
    )
    employees = []
    for employee, department_name in results:
        employee_dict = employee.__dict__
        employee_dict["department_name"] = department_name
        employees.append(schemas.EmployeeOutM(**employee_dict))
    return employees

    # return (
    #     db.query(models.Employee, models.Department.name)
    #     .join(models.Department, models.Employee.dept_id == models.Department.id)
    #     .filter(models.Employee.manager_id == manager_id)
    #     .all()
    # )
# def getEmployees(manager_id : int, db:Session = Depends(get_db)):
#     return db.query(models.Employee).filter(models.Employee.manager_id == manager_id).all()
    # return db.query(models.Employee, models.Department.name.label('department')).join(models.Department).filter(models.Employee.manager_id == manager_id).all()

    # employee_list = db.query(models.Employee).filter(models.Employee.manager_id == manager_id).all()
    # return employee_list

@router.get('/manager/{emp_id}')
def getManagerId(emp_id : int, db: Session = Depends(get_db)):
    emp_manager = db.query(models.Employee).filter(models.Employee.id==emp_id).first()
    if not emp_manager:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"employee with a id {emp_id} not found")
    
    return {"manager_id" : emp_manager.manager_id}

@router.get('/employees/{emp_id}/profile')
def getManagerId(emp_id : int, db: Session = Depends(get_db)):
    emp = db.query(models.Employee).filter(models.Employee.id==emp_id).first()
    if not emp:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"employee with a id {emp_id} not found")
    
    department_name = emp.department.name
    
    # Get the manager name
    if emp.manager_id:
        manager = db.query(models.Employee).filter(models.Employee.id == emp.manager_id).first()
        manager_name = manager.email
    else:
        manager_name = None

    return {
        "id": emp.id,
        "email": emp.email,
        "designation": emp.designation,
        "department_name": department_name,
        "manager_email": manager_name,
        "doj": emp.doj.isoformat() if emp.doj else None,
        "user_type": emp.user_type
        }