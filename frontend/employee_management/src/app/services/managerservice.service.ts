import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { LoginService } from './loginservice.service';

@Injectable({
  providedIn: 'root'
})

export class ManagerService{
    employees : any;
    constructor(private http : HttpClient, private loginService: LoginService){}

    viewEmployeeDetails(){
        const manager_id = this.loginService.decodedToken.emp_id
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem('authToken')
          });
        return this.http.get(`http://127.0.0.1:8000/employees/${manager_id}`, {headers})
    }

    getLeaveApplications(){
        const manager_id = this.loginService.decodedToken.emp_id
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem('authToken')
          });
          return this.http.get(`http://127.0.0.1:5002/leave-applications-manager/${manager_id}`, {headers})   
    }

    assignTask(data : any){
        const manager_id = this.loginService.decodedToken.emp_id
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem('authToken')
          });

        return this.http.post(`http://127.0.0.1:5005/manager/${manager_id}/add-task`, data, {headers})
    }
    viewTaskUpdates(){
      const manager_id = this.loginService.decodedToken.emp_id
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem('authToken')
          });
          return this.http.get(`http://127.0.0.1:5005/manager/${manager_id}/view-task`, {headers})
    }

    updateLeaveApplications(leave_id : number, data : any){      
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem('authToken')
          });
          return this.http.put(`http://127.0.0.1:5002/leave-applications-manager/${leave_id}`,data, {headers})
    }

}   

