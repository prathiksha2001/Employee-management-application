from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from admin import models
from .database import engine
from admin.main import app
from sqlalchemy.orm import sessionmaker
from admin.database import sessionLocal, engine


client = TestClient(app)

models.Base.metadata.create_all(bind=engine)
SessionLocal = sessionmaker(bind=engine,autoflush=False, autocommit=False)

def test_add_employee_as_admin():
   
    db = SessionLocal()
   
    access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcmF0aGlAc3RsLnRlY2giLCJyb2xlIjoiYWRtaW4iLCJlbXBfaWQiOjEsImV4cCI6MTY3OTM4NTM5OX0.GqVQDN8VMUxEbNL7uFKdYeLIrjrvgyc2zLD5wYcm-qM"

    
    department = {
        'id' : 4,
        "name" : 'Logistics'
    }

    
    employee = {
        'email': 'john1.doe@example.com',
        'password': 'password123',
        'designation': 'Software Engineer',
        'dept_id': department['id'],
        'doj': '2022-01-01',
        'user_type': 'employee'
    }

   
    response = client.post('/employees', json=employee, headers={'Authorization': f'Bearer {access_token}'})

    
    assert response.status_code == 200

    
    assert db.query(models.Employee).filter_by(email=employee['email']).first() is not None    
    db.commit()
    db.close()


def test_assign_manager_as_admin():
    
    db = SessionLocal()
    
    access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcmF0aGlAc3RsLnRlY2giLCJyb2xlIjoiYWRtaW4iLCJlbXBfaWQiOjEsImV4cCI6MTY3OTM4NTM5OX0.GqVQDN8VMUxEbNL7uFKdYeLIrjrvgyc2zLD5wYcm-qM'

    
    department = {
        'id' : 4,
        "name" : 'Logistics'
    }


    
    employee = {
        'id' : 6,
        "email" : 'kanmani@stl.tech',
        "password": 'kanmani123',
        "designation" : 'Logistics Manager',
        "dept_id" : 4,
        "doj" : '2023-03-12',
        "user_type" : 'manager'
    }

   
    manager = {
        'id' : 10,
        "email" : 'ben@stl.tech',
        "password": 'ben123',
        "designation" : 'Senior Logistic Manager',
        "dept_id" : 4,
        "doj" : '2023-03-5',
        "user_type" : 'manager'
    }
    

    
    request = {
        'manager_id': manager['id']
    }

    response = client.put(f'/employees/{employee["id"]}/manager', json=request, headers={'Authorization': f'Bearer {access_token}'})

    assert response.status_code == 200


    updated_employee = db.query(models.Employee).filter_by(id=employee['id']).first()
    assert updated_employee.manager_id == manager['id']

    db.commit()
    db.close()