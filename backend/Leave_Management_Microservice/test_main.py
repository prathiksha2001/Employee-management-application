import json
from datetime import date
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from leave import models
from leave.database import Base, engine
from main import app
from leave.router.repository import crud
import pytest
import requests
from fastapi import status

Base.metadata.create_all(bind=engine)

client = TestClient(app)

@pytest.fixture(autouse=True)
def db():
    Base.metadata.create_all(bind=engine)
    db = Session(bind=engine)
    yield db
    db.close()

def test_leave_successfully_applied(db, monkeypatch):
    
    leave_data = {
        "emp_id": 6,
        "leave_type_id": 1,
        "start_date": str(date.today()),
        "end_date": str(date.today()),
        "reason": "Test reason"
    }

   
    
    response = client.post("/leave-application/", headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJrYW5tYW5pQHN0bC50ZWNoIiwicm9sZSI6Im1hbmFnZXIiLCJlbXBfaWQiOjYsImV4cCI6MTY3OTM5NTE4M30.8HF9PsOfnSQNcXmaf2e66-uHMV3H-CJq5YVB44sVprc"}, json=leave_data)

    assert response.status_code == 200
    assert response.json() == "Leave applied successfully"

def test_leave_missing_required_field(db, monkeypatch):
    
    leave_data = {
        "emp_id": 6,
        "leave_type_id": 1,
        "start_date": str(date.today()),
        "end_date": str(date.today()),
        
    }

    response = client.post("/leave-application/", headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJrYW5tYW5pQHN0bC50ZWNoIiwicm9sZSI6Im1hbmFnZXIiLCJlbXBfaWQiOjYsImV4cCI6MTY3OTM5NTE4M30.8HF9PsOfnSQNcXmaf2e66-uHMV3H-CJq5YVB44sVprc"}, json=leave_data)
    
    assert "field required" in response.text
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

def test_update_leave_application(db: Session):
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZW5Ac3RsLnRlY2giLCJyb2xlIjoibWFuYWdlciIsImVtcF9pZCI6OCwiZXhwIjoxNjc5NDAwMDQyfQ.O_W2jdBTZxPFG_9aV6sdFvkX5hOyN2OooMI8JjjZZcI"
    id = 4
    leave_type_id = 1
    leave_balance_before_accepting = db.query(models.LeaveBalance).filter(models.LeaveBalance.emp_id == leave_application.emp_id, models.LeaveBalance.leave_type_id == leave_type_id).first()
   
    response = client.put(f"/leave-applications-manager/{id}", json={'status': 'approved'}, headers={'Authorization': f'Bearer {token}'})
    assert response.status_code == 200
    assert response.json() == 'Approved Successfully'
    leave_application = db.query(models.Leave).filter(models.Leave.id == id).first()
   
    assert leave_application.status == 'approved'
    leave_balance_after_accepting = db.query(models.LeaveBalance).filter(models.LeaveBalance.emp_id == leave_application.emp_id, models.LeaveBalance.leave_type_id == leave_type_id).first()
    leave_days = (leave_application.end_date - leave_application.start_date).days+1
    assert leave_balance_after_accepting.leave_balance + leave_days == leave_balance_before_accepting # 3 days leave deducted from limit
    
    response = client.put(f"/leave-applications-manager/{id}", json={'status': 'rejected'}, headers={'Authorization': f'Bearer {token}'})
    assert response.status_code == 200
    assert response.json() == 'Rejected Successfully'
    leave_application = db.query(models.Leave).filter(models.Leave.id == leave_application.id).first()
    assert leave_application.status == 'rejected'
    assert db.query(models.LeaveBalance).filter(models.LeaveBalance.emp_id == leave_application.emp_id, models.LeaveBalance.leave_type_id == leave_type_id).first().leave_balance == 4  # leave balance remains unchanged




