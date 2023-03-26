import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/services/employeeservice.service';
import { LoginService } from 'src/app/services/loginservice.service';
import { parseISO } from 'date-fns';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent {
  leaveForm : FormGroup;
  minDate: Date;
  
  filterEndDate = (d: Date | null): boolean => {
    const startDateValue = this.leaveForm.get('start_date')?.value;
    const startDate = startDateValue instanceof Date ? startDateValue : new Date(startDateValue);
  
    if (!d) {
      return false;
    }
  
    return !startDate || d >= startDate;
  };
  
  startDate: any;

  constructor(private loginService : LoginService, private employeeService: EmployeeService,
    private snackBar: MatSnackBar){
    this.leaveForm = new FormGroup({
      emp_id : new FormControl({value: this.loginService.decodedToken.emp_id, disabled: true}),
      leave_type_id : new FormControl('', Validators.required),
      start_date : new FormControl(null, Validators.required),
      end_date : new FormControl(null, Validators.required),
      reason : new FormControl(null, Validators.required)
      // other form controls here)
    })
    this.minDate = new Date()
    
    
  }
  
  submitForm(){
    // const start_date = new Date(this.leaveForm.get('start_date')?.value);
    // const formattedStartDate = start_date.toISOString().substring(0, 10);
    // const end_date = new Date(this.leaveForm.get('end_date')?.value);
     // const formattedEndDate = end_date.toLocaleDateString().substring(0, 10);
    
    //  const end_date =this.leaveForm.get('end_date')?.value
    //  if (isNaN(end_date.getTime())) {
    //   console.log('Invalid date:', this.leaveForm.get('end_date')?.value);
    //   return;
    // }
    //  const formattedEndDate = end_date.toISOString().split('T')[0];
   
    const start_date = new Date(this.leaveForm.get('start_date')?.value);
    const timezoneOffset = start_date.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
    const formattedStartDate = new Date(start_date.getTime() - timezoneOffset).toISOString().substring(0, 10);
    const end_date = new Date(this.leaveForm.get('end_date')?.value);
    const timezoneOffset1 = end_date.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
    const formattedEndDate = new Date(end_date.getTime() - timezoneOffset1).toISOString().substring(0, 10);


    // console.log('prathiksha',formattedStartDate,formattedEndDate)
    const data = {
      "emp_id" : this.loginService.decodedToken.emp_id,
      "leave_type_id" : this.leaveForm.get('leave_type_id')?.value,
      "start_date" : formattedStartDate,
      "end_date" : formattedEndDate,
      "reason" : this.leaveForm.get('reason')?.value
    }
    console.log(data)
    this.employeeService.applyLeave(data).subscribe((result) => {
      console.log(result);
      this.leaveForm.reset();
      this.snackBar.open('Leave Applied successful', 'Close', { duration: 2000 });
    },
    (error) => {
      console.error(error);
      this.snackBar.open('Leave Application failed', 'Close', { duration: 2000 });
    })
  }
  
}


