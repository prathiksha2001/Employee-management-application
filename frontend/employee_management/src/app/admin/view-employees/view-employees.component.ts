import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { AdminService } from 'src/app/services/adminservice.service';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent implements OnInit {
  
  employees: Employee[];

  constructor(private adminService : AdminService){
    this.employees = []
  }

  ngOnInit(): void {
    this.adminService.getEmployeeList().subscribe((res) =>{
      this.employees = res
    })
  }
  
}
