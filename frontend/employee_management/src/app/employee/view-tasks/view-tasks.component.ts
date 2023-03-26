import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/services/employeeservice.service';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css']
})
export class ViewTasksComponent implements OnInit{
  
  isTasks : boolean = false;
  tasks : any;
  editing: boolean[] = [];
  status = ['pending','started','in progress', 'completed']
 constructor(private employeeService : EmployeeService,private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.employeeService.viewTasks().subscribe(res =>{
      this.tasks = res;      
    },(error)=>{
      if(error.status === 404){
        
          this.isTasks = true;
        
      }
    })
  }
  

  statusUpdate(id : any, action: any){
      this.employeeService.updateTask(id,action).subscribe((result) => {
        console.log(result);        
        this.snackBar.open('Updated successful', 'Close', { duration: 2000 });
      },
      (error) => {
        console.error(error);
        this.snackBar.open('Updation failed', 'Close', { duration: 2000 });
      })
  }
}
