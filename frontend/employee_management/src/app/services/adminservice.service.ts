import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Department } from '../models/department.model';
import { Employee } from '../models/employee.model';
import { EmployeeRegistration } from '../models/empregistration.model';

@Injectable({
    providedIn: 'root'
  })

export class AdminService {
    department_list : Department[];
    access_token = sessionStorage.getItem('authToken') 
    
    constructor(private http: HttpClient) {
        this.department_list = []; 
      }

      getdepartmentList(){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionStorage.getItem('authToken')
          });
          console.log(headers)
        return this.http.get<Department[]>('http://127.0.0.1:8000/departments', { headers})
      }
      adddepartmentList(data: any) {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken')
        });
        console.log(headers);
        return this.http.post('http://127.0.0.1:8000/departments', data, { headers });
      }   

      getEmployeeList(){
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem('authToken')
        });
        return this.http.get<Employee[]>('http://127.0.0.1:8000/employees', {headers})
      }

      employeeRegistration(data : any){
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem('authToken')
        });
        return this.http.post<EmployeeRegistration>('http://127.0.0.1:8000/employees', data = data,{headers})
      }

      assignManager(employee_id : number, manager_id : number){
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem('authToken')
        });
        const data = {
          'manager_id' : manager_id
        }
        console.log(employee_id, manager_id, data)
        return this.http.put(`http://127.0.0.1:8000/employees/${employee_id}/manager`, data ,{headers})
      }
}