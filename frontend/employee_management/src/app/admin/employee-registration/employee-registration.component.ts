import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from 'src/app/models/department.model';
import { EmployeeRegistration } from 'src/app/models/empregistration.model';
import { AdminService } from 'src/app/services/adminservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.css']
})
export class EmployeeRegistrationComponent {
  registrationForm : FormGroup;
  departments :any;
  
  constructor(private adminService : AdminService,private snackBar: MatSnackBar) {
    this.departments = [];
    this .registrationForm = new FormGroup(
      {email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      designation : new FormControl('', [Validators.required]),
      dept_id : new FormControl('', [Validators.required]),
      doj : new FormControl('', Validators.required),
      user_type : new FormControl('', Validators.required)
    }
    )   
   
  }

  ngOnInit(): void {
    this.adminService.getdepartmentList().subscribe((res) => {
      this.departments = res;
      console.log(res)
    })
  }
  submitForm(){
    // const currentDoj =this.registrationForm.get('doj')?.value;
    // const formattedDate = currentDoj.toISOString().substring(0, 10);
    const start_date = new Date(this.registrationForm.get('doj')?.value);
    const timezoneOffset = start_date.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
    const formattedDate = new Date(start_date.getTime() - timezoneOffset).toISOString().substring(0, 10);

    const data = {
      email: this.registrationForm.get('email')?.value,
      password: this.registrationForm.get('password')?.value,
      designation: this.registrationForm.get('designation')?.value,
      dept_id: this.registrationForm.get('dept_id')?.value,
      doj: formattedDate,
      user_type: this.registrationForm.get('user_type')?.value
    };
    const selectedDate = 'Tue Mar 14 2023 00:00:00 GMT+0530';

  const dateObj = new Date(selectedDate);
  
  console.log(this.registrationForm)
  this.adminService.employeeRegistration(data).subscribe(
    (result) => {
      console.log(result);
      this.registrationForm.reset();
      this.snackBar.open('Registration successful', 'Close', { duration: 2000 });
    },
    (error) => {
      console.error(error);
      this.snackBar.open('Registration failed', 'Close', { duration: 2000 });
    }
  );
  }
}
