from fastapi.testclient import TestClient
import pytest
from .main import app
from fastapi import status
from fastapi.security import OAuth2PasswordRequestForm

client = TestClient(app=app)

@pytest.fixture(scope="module")
def client():
    with TestClient(app) as client:
        yield client

def test_login_successful(client):
    form_data = {
        "username": "prathi@stl.tech",
        "password": "prathi123"
    }
    response = client.post('/login', data=form_data)
    assert response.status_code == status.HTTP_200_OK
    assert "access_token" in response.json()
    assert response.cookies.get("session_token") is not None

def test_login_incorrect_email(client):
    form_data = {
        "username": "invalid@stl.tech",
        "password": "prathi123"
    }
    response = client.post('/login', data=form_data)
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert "Incorrect email" in response.text

def test_login_incorrect_password(client):
    form_data = {
        "username": "prathi@stl.tech",
        "password": "invalid_password"
    }
    response = client.post('/login', data=form_data)
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert "Incorrect email or password" in response.text

def test_login_missing_fields(client):
    form_data = {}
    response = client.post('/login', data=form_data)
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    assert "field required" in response.text



# def test_get_all_patient():
#     response = client.get('/login')
#     try:
#         assert response.status_code == status.HTTP_200_OK
#     except AssertionError:
#         raise
# def test_login():
#     form_data = OAuth2PasswordRequestForm(username="prathi@gmail.com", password="prathi123",scope="")
#     response = client.post('/login',data=form_data)
#     assert response.status_code == status.HTTP_200_OK
#     response3 = client.post('/login',data={"username":"","password":"prathi123"})
#     assert response3.status_code == status.HTTP_404_NOT_FOUND
#     response4 = client.post('/login',data={"username":"prathi","password":"prathi"})
#     assert response4.status_code == status.HTTP_404_NOT_FOUND
