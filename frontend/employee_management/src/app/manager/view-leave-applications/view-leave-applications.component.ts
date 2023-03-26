import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { ManagerService } from 'src/app/services/managerservice.service';

@Component({
  selector: 'app-view-leave-applications',
  templateUrl: './view-leave-applications.component.html',
  styleUrls: ['./view-leave-applications.component.css']
})
export class ViewLeaveApplicationsComponent implements OnInit {
  leaveApplications : any;
  employeedetails : any;
  status: { label: string, color: string };
  isleaveApplication : boolean = false;
  constructor(private managerService : ManagerService,private snackBar: MatSnackBar){
    this.leaveApplications = []
    this.status = {
      label : "",
      color : ""
    }
  }
  
  ngOnInit() {
    forkJoin([
      this.managerService.viewEmployeeDetails(),
      this.managerService.getLeaveApplications()
    ]).subscribe(([employeeDetails, leaveApplications]) => {
      this.employeedetails = employeeDetails;
      this.leaveApplications = leaveApplications;
      console.log('Employee details:', employeeDetails);
      console.log('Leave applications:', leaveApplications);
      if (leaveApplications === null){
          // this.isleaveApplication = true;
          console.log(leaveApplications)
      }
      else{
        this.isleaveApplication = true
        for (let leaveApp of this.leaveApplications) {
          for (let emp of this.employeedetails) {
            if (leaveApp.emp_id === emp.id) {
              leaveApp['employee_email'] = emp.email;
              break;
            }
          }
        }
      }
      console.log(this.leaveApplications);
    });
  }
  

  statusUpdate(leave_application : any, action : string){
    const data = {
      'status': action
    }    
    this.managerService.updateLeaveApplications(leave_application.id,data).subscribe((res)=>{      
      console.log(res);      
      this.snackBar.open('Updated Successfully', 'Close', { duration: 2000 });
      leave_application.status = action;
      
    this.leaveApplications = this.leaveApplications.filter((app : any) => app.id !== leave_application.id);
    },
    (error : any) => {
      console.error(error);
      this.snackBar.open('Updation failed', 'Close', { duration: 2000 });
    })
  }
  
}
