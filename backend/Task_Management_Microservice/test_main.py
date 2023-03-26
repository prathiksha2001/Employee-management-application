import json
from datetime import date
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from tasks import models
from tasks.database import Base, engine, get_db
from main import app
import pytest 
from fastapi import status, Depends

Base.metadata.create_all(bind=engine)

client = TestClient(app)

@pytest.fixture(autouse=True)
def db():
    Base.metadata.create_all(bind=engine)
    db = Session(bind=engine)
    yield db
    db.close()
    
# db = Depends(get_db)

# def test_assign_task_valid_input(db: Session):
#     manager_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZW5Ac3RsLnRlY2giLCJyb2xlIjoibWFuYWdlciIsImVtcF9pZCI6OCwiZXhwIjoxNjc5NDE5NTYxfQ.WedOr-NaRr491UVoO11aUPLfIrAhctRgat0Rl5nYs-M"
    
#     # Create a valid Task object
#     task = {
#         "title": "Test Task",
#         "description": "This is a test task",
#         "emp_id": 6,
#         "due_date": str(date.today())
#     }
    
#     emp_id = 10

#     response = client.post(f"/manager/{emp_id}/add-task", headers={"authorization": manager_token}, json=task)

#     assert response.status_code == 200

#     task_in_db = db.query(models.Task).filter(models.Task.title == task["title"]).first()
#     assert task_in_db is not None
#     assert task_in_db.title == task["title"]
#     assert task_in_db.description == task["description"]
#     assert task_in_db.emp_id == task["emp_id"]
#     assert str(task_in_db.due_date) == task["due_date"]

# def test_assign_task_with_invalid_input_format(db: Session):
#     manager_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZW5Ac3RsLnRlY2giLCJyb2xlIjoibWFuYWdlciIsImVtcF9pZCI6OCwiZXhwIjoxNjc5NDE5NTYxfQ.WedOr-NaRr491UVoO11aUPLfIrAhctRgat0Rl5nYs-M"
    
#     # Create a valid Task object
#     task = {
#         "title": "Test Task",
#         "description": "This is a test task",
#         "emp_id": 6,
#         "due_date": "02-04-2023"
#     }
    
#     emp_id = 10

#     response = client.post(f"/manager/{emp_id}/add-task", headers={"authorization": manager_token}, json=task)

#     assert response.status_code == 422
#     assert "invalid date format" in response.text
#     assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

# def test_assign_task_with_missing_input(db: Session):
#     manager_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZW5Ac3RsLnRlY2giLCJyb2xlIjoibWFuYWdlciIsImVtcF9pZCI6OCwiZXhwIjoxNjc5NDE5NTYxfQ.WedOr-NaRr491UVoO11aUPLfIrAhctRgat0Rl5nYs-M"
    
#     # Create a valid Task object
#     task = {}
    
#     emp_id = 10

#     response = client.post(f"/manager/{emp_id}/add-task", headers={"authorization": manager_token}, json=task)

#     assert response.status_code == 422
#     assert "field required" in response.text
#     assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

# def test_update_task_valid_input(db : Session):
#     emp_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJrYW5tYW5pQHN0bC50ZWNoIiwicm9sZSI6Im1hbmFnZXIiLCJlbXBfaWQiOjYsImV4cCI6MTY3OTQyMjY0Nn0.jbXmB8Z0ipU7II6y2z9zlGzwH9RTmQfhivdaVLWjgIg"

#     # Create a task
#     task = models.Task(title = "testing", description = "unit testing",
#                            manager_id = 10, emp_id = 6, due_date = str(date.today()),
#                            created_at = date.today(), updated_at = date.today(),status = 'pending')
#     db.add(task)
#     db.commit()

#     # Update the task
#     update_data = {"id": task.id, "status": "in progress"}
#     response = client.put(f"/employees/{task.emp_id}/update_task", headers={"authorization": emp_token}, json=update_data)

#     assert response.status_code == status.HTTP_200_OK
#     assert response.json() == "updated successfully"

    
#     updated_task = db.query(models.Task).filter(models.Task.id == task.id).first()
#     print(update_data)
    # assert updated_task.status == "in progress"
    # assert updated_task.updated_at == date.today()
    