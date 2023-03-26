import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employeeservice.service';
import { LoginService } from 'src/app/services/loginservice.service';

@Component({
  selector: 'app-professional-details',
  templateUrl: './professional-details.component.html',
  styleUrls: ['./professional-details.component.css']
})
export class ProfessionalDetailsComponent {

  employeeForm: FormGroup;
  employee: any; 
  

  constructor(private formBuilder: FormBuilder,private employeeService: EmployeeService,
              private loginService: LoginService) {
    this.employeeForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      department: [{ value: '', disabled: true }, Validators.required],
      designation: [{ value: '', disabled: true }, Validators.required],
      doj: [{ value: '', disabled: true }, Validators.required],
      manager: [{ value: '', disabled: true }, Validators.required]
    });
   }

  ngOnInit(): void {

    this.employee = this.employeeService.viewEmployeeProfile().subscribe(res=>{
      console.log(res)
      this.employee = res;
      this.employeeForm.patchValue({
        id: this.employee.id,
        email: this.employee.email,
        department: this.employee.department_name,
        designation: this.employee.designation,
        doj: this.employee.doj,
        manager: this.employee.manager_email
      });
      if (this.employee.manager_email !== null && this.loginService.decodedToken.role === 'manager'){
              this.employeeService.isManagerhasManager = true;
              console.log("manager has a manager")
      }
    });
    
   
  }
  
}
