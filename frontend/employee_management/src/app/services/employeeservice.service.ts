import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import { LoginService } from './loginservice.service';

@Injectable({
    providedIn: 'root'
  })

export class EmployeeService{

  isManagerhasManager : boolean = false;
constructor(private http : HttpClient, private loginService: LoginService){}

viewTasks(){
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem('authToken')
      });
    const emp_id = this.loginService.decodedToken.emp_id
    return this.http.get(`http://127.0.0.1:5005/employees/${emp_id}/view-task`, {headers})
}

viewLeaveApplications(){
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem('authToken')
      });
    const emp_id = this.loginService.decodedToken.emp_id
    return this.http.get(`http://127.0.0.1:5002/leave-application/${emp_id}`, {headers}) 
}
viewLeaveBalances(){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+sessionStorage.getItem('authToken')
  });
  const emp_id = this.loginService.decodedToken.emp_id
  return this.http.get(`http://127.0.0.1:5002/leavebalance/${emp_id}`,{headers})
}

applyLeave(data : any){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+sessionStorage.getItem('authToken')
  });
  return this.http.post('http://127.0.0.1:5002/leave-application',data, {headers})
}

updateTask(id: number, status: string){
  const data = {
    "id" : id,
    "status" : status
  }
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+sessionStorage.getItem('authToken')
  });
  const emp_id = this.loginService.decodedToken.emp_id
  return this.http.put(`http://127.0.0.1:5005/employees/${emp_id}/update_task`,data, {headers})
}

viewEmployeeProfile(){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+sessionStorage.getItem('authToken')
  });
  const emp_id = this.loginService.decodedToken.emp_id
  return this.http.get(`http://127.0.0.1:8000/employees/${emp_id}/profile`, {headers})
}

viewEmployeePersonalinfo(){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+sessionStorage.getItem('authToken')
  });
  const emp_id = this.loginService.decodedToken.emp_id
  return this.http.get(`http://127.0.0.1:8002/employee/${emp_id}`, {headers})
}
viewEmployeeAddress(){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+sessionStorage.getItem('authToken')
  });
  console.log(this.loginService.decodedToken.emp_id)
  console.log(sessionStorage.getItem('authToken'))
  console.log(headers)
  const emp_id = this.loginService.decodedToken.emp_id
  return this.http.get(`http://127.0.0.1:8002/address/${emp_id}`, {headers})
}

addPersonalInfo(data : any){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+sessionStorage.getItem('authToken')
  });
  
  return this.http.post('http://127.0.0.1:8002/employee',data, {headers})
}
updatePersonalInfo(data : any){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+sessionStorage.getItem('authToken')
  });
  const emp_id = this.loginService.decodedToken.emp_id
  return this.http.put(`http://127.0.0.1:8002/employee/${emp_id}`,data, {headers})
}
addAddressInfo(data : any){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+sessionStorage.getItem('authToken')
  });
  
  return this.http.post('http://127.0.0.1:8002/address',data, {headers})
}
updateAddressInfo(data : any){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+sessionStorage.getItem('authToken')
  });
  const emp_id = this.loginService.decodedToken.emp_id
  return this.http.put(`http://127.0.0.1:8002/address/${emp_id}`,data, {headers})
}

}

