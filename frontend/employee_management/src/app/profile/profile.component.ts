import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employeeservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  showPersonalInfoForm : boolean = false;
  showAddressForm : boolean = false;
  employeeForm: FormGroup;
  addressForm: FormGroup;
  isProfileButton: boolean = false;
  profileDetails : any;
  constructor(private fb: FormBuilder, private employeeService : EmployeeService) {
    this.employeeForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      contact: ['', Validators.required],
    });

    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.employeeService.viewEmployeeProfile().subscribe((result)=>{
      if (result === null){
        this.isProfileButton = true;
      }
      else{
        this.profileDetails = result;
      }
    },
    (error)=>{
      
    })
  }
}
