import requests
import json

def addLeaveBalance(new_employee, headers):
    # , headers
    leave_info_payload = {
        "emp_id" : new_employee.id
    }
    leave_management_url = "http://127.0.0.1:5002/add-leave-balance"
    response = requests.post(leave_management_url,data = json.dumps(leave_info_payload))
    try:
        response_data = json.loads(response.text)
    except json.JSONDecodeError:
        print(f"Error decoding response from {leave_management_url}: {response.text}")
        response_data = None
    return response_data


def addUserInAuth(new_employee, authorization):
    
    user_management_payload = {
                "emp_id": new_employee.id,
                "email": new_employee.email,
                "password": new_employee.password,
                "role": new_employee.user_type
            }
    headers = {
        'Authorization': authorization,
        'Content-Type': 'application/json'        
    } 
    user_management_url = "http://127.0.0.1:5000/add_user"
    
    response = requests.post(user_management_url, data = json.dumps(user_management_payload))
    try:
        response_data = json.loads(response.text)
    except json.JSONDecodeError:
        print(f"Error decoding response from {user_management_url}: {response.text}")
        response_data = None    
    return addLeaveBalance(new_employee, headers), response_data