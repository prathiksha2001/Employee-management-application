import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employeeservice.service';

@Component({
  selector: 'app-view-leave-balance',
  templateUrl: './view-leave-balance.component.html',
  styleUrls: ['./view-leave-balance.component.css']
})
export class ViewLeaveBalanceComponent implements OnInit {
  leaveBalances : any;

  constructor(private employeeService : EmployeeService){}
  ngOnInit(): void {
   this.employeeService.viewLeaveBalances().subscribe((res)=>{
    console.log(res)
    this.leaveBalances = res;
   })
  }

  
}
