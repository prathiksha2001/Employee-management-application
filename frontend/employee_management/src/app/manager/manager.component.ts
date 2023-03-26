import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employeeservice.service';
import { LoginService } from '../services/loginservice.service';


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit{
  isManagerHasManager = false;

  constructor(private employeeService: EmployeeService, private loginService : LoginService){}
  
  ngOnInit(): void {
    this.isManagerHasManager = this.employeeService.isManagerhasManager;
  }
  

  logout(){
    console.log('logout')
    this.loginService.logout()
      
  }
}
