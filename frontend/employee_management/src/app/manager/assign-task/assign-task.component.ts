import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManagerService } from 'src/app/services/managerservice.service';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.css']
})
export class AssignTaskComponent implements OnInit {
  assignTask : FormGroup;
  employees: any;
  minDate: Date;
  constructor(private managerService: ManagerService, private snackBar: MatSnackBar){
    this.assignTask = new FormGroup({
      title : new FormControl('', Validators.required),
      description : new FormControl('', Validators.required),
      emp_id : new FormControl('', Validators.required),
      due_date : new FormControl('', Validators.required)
    })
    this.minDate = new Date()
  }
  ngOnInit(): void {
    this.employees = this.managerService.employees;
  }
  submitForm(){
    // const currentDoj = this.assignTask.get('due_date')?.value;
    // const formattedDate = currentDoj.toISOString().substring(0, 10);
    const start_date = new Date(this.assignTask.get('due_date')?.value);
    const timezoneOffset = start_date.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
    const formattedDate = new Date(start_date.getTime() - timezoneOffset).toISOString().substring(0, 10);
    console.log(formattedDate)
    const data = {
      title: this.assignTask.get('title')?.value,
      description: this.assignTask.get('description')?.value,
      emp_id: this.assignTask.get('emp_id')?.value,
      due_date: formattedDate,  
    };
    this.managerService.assignTask(data).subscribe((res)=>{      
        console.log(res);
      this.assignTask.reset();
      this.snackBar.open('Registration successful', 'Close', { duration: 2000 });
      },
      (error : any) => {
        console.error(error);
        this.snackBar.open('Registration failed', 'Close', { duration: 2000 });
      }
    )
  }
}
