import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/services/managerservice.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-view-task-updates',
  templateUrl: './view-task-updates.component.html',
  styleUrls: ['./view-task-updates.component.css']
})
export class ViewTaskUpdatesComponent implements OnInit{
  taskUpdates : any;
  istaskUpdates = false;
  employeedetails_list : any
  constructor(private managerService : ManagerService){}

  ngOnInit(): void {
    forkJoin([
      this.managerService.viewEmployeeDetails(),
      this.managerService.viewTaskUpdates()
    ]).subscribe(([employeeDetails, taskUpdates_list]) => {
      this.employeedetails_list = employeeDetails;
      this.taskUpdates = taskUpdates_list;
      console.log('Employee details:', employeeDetails);
      console.log('Leave applications:', taskUpdates_list);
      if (taskUpdates_list === null){
          // this.isleaveApplication = true;
          console.log()
      }
      else{
        this.istaskUpdates = true
        for (let leaveApp of this.taskUpdates) {
          for (let emp of this.employeedetails_list) {
            if (leaveApp.emp_id === emp.id) {
              leaveApp['employee_email'] = emp.email;
              break;
            }
          }
        }
      }
      // console.log(this.leaveApplications);
    });
    // this.managerService.viewTaskUpdates().subscribe((res)=>{
    //   console.log(res)
    //   this.taskUpdates = res;
    //   if(this.taskUpdates === null){
    //     this.istaskUpdates = true;
    //   }
    // },(error: HttpErrorResponse) => {
    //   if (error.status === 404) {
    //    this.istaskUpdates = true;
    //   }
    // })
  }

}
