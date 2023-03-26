import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employeeservice.service';


@Component({
  selector: 'app-track-leave-applications',
  templateUrl: './track-leave-applications.component.html',
  styleUrls: ['./track-leave-applications.component.css']
})
export class TrackLeaveApplicationsComponent implements OnInit {
  
  isleaveApplication : boolean = false;
  leaveApplications : any;

  constructor(private employeeService : EmployeeService){}

  ngOnInit(): void {
    this.employeeService.viewLeaveApplications().subscribe((res)=>{
      console.log(res)
      this.leaveApplications = res;
      this.isleaveApplication = true
    })
  }
}
