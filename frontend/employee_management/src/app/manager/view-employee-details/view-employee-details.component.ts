import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { ManagerService } from 'src/app/services/managerservice.service';

@Component({
  selector: 'app-view-employee-details',
  templateUrl: './view-employee-details.component.html',
  styleUrls: ['./view-employee-details.component.css']
})
export class ViewEmployeeDetailsComponent implements OnInit {
employees :any;

constructor(private managerService : ManagerService){
  this.employees = []
}

  ngOnInit(): void {
    this.managerService.viewEmployeeDetails().subscribe((res)=>{
      this.employees = res;
      this.managerService.employees = res;
    })
  }
}
