import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/services/employeeservice.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  
  // showPersonalInfoForm : boolean = false;
  // showAddressInfoForm : boolean = false;
  
  employeeForm: FormGroup;
  addressForm: FormGroup;

  isProfileButton: boolean = false;
  isAddressButton = false;

  profileDetails : any;
  addressDetails : any;

  isProfileEditMode = false;
  isAddressEditMode = false;

  isAddress404 = false;
  isProfile404 = false;

  constructor(private fb: FormBuilder, private employeeService : EmployeeService,private snackBar: MatSnackBar) {
    this.employeeForm = this.fb.group({
      firstname: [{ value: '', disabled: true }, Validators.required],
      lastname: [{ value: '', disabled: true }, Validators.required],
      gender: [{ value: '', disabled: true }, Validators.required],
      dob: [{ value: '', disabled: true }, Validators.required],
      contact: [{ value: '', disabled: true }, Validators.required],
    });

    this.addressForm = this.fb.group({
      street: [{ value: '', disabled: true }, Validators.required],
      city: [{ value: '', disabled: true }, Validators.required],
      state: [{ value: '', disabled: true }, Validators.required],
      zipcode: [{ value: '', disabled: true }, Validators.required],
    });
}
  ngOnInit(): void {
    this.employeeService.viewEmployeePersonalinfo().subscribe((res)=>{      
      this.profileDetails = res;
      this.isProfileButton = false;
      
      this.employeeForm.patchValue({
        firstname : this.profileDetails.firstname,
        lastname : this.profileDetails.lastname,
        gender : this.profileDetails.gender,
        dob: this.profileDetails.dob,
        contact : this.profileDetails.contact
      })
    },
    
  error => {
    if (error.status === 404) {
      this.isProfileButton = true;
      this.isProfile404 = true;
    }
  });
  this.employeeService.viewEmployeeAddress().subscribe((res)=>{
    console.log(res)
    this.addressDetails = res;
      this.isAddressButton = false;
      
      this.addressForm.patchValue({
        street : this.addressDetails.street,
        city : this.addressDetails.city,
        state : this.addressDetails.state,
        zipcode: this.addressDetails.zipcode,
        
      })
    },
    
  error => {
    if (error.status === 404) {
      this.isAddressButton = true;
      this.isAddress404 = true;
    }
  
  })
  }
  toggleProfileEditMode(): void {
    this.isProfileEditMode = !this.isProfileEditMode;
    if (this.isProfileEditMode) {
      this.employeeForm.enable();
    } else {
      this.employeeForm.disable();
    }
  }
  toggleAddressEditMode(): void {
    this.isAddressEditMode = !this.isAddressEditMode;
    if (this.isAddressEditMode) {
      this.addressForm.enable();
    } else {
      this.addressForm.disable();
    }
  }

  saveProfileChanges(): void {
    // perform save operation here
    this.isProfileEditMode = false;
    this.employeeForm.disable();
    const currentDob = new Date(this.employeeForm.get('dob')?.value);
    const formattedDate = currentDob.toISOString().substring(0, 10);
    const data = {      
      firstname: this.employeeForm.get('firstname')?.value,
      lastname: this.employeeForm.get('lastname')?.value,
      gender: this.employeeForm.get('gender')?.value,
      dob: formattedDate,
      contact:this.employeeForm.get('contact')?.value       
    };
    if(this.isProfile404){
      this.employeeService.addPersonalInfo(data).subscribe((result) => {
        console.log(result);        
        this.snackBar.open('Profile updated successfully', 'Close', { duration: 2000 });
      },
      (error) => {
        console.error(error);
        this.snackBar.open('profile update failed', 'Close', { duration: 2000 });
      })
    }
    else{
      this.employeeService.updatePersonalInfo(data).subscribe((result) => {
        console.log(result);        
        this.snackBar.open('Profile updated successfully', 'Close', { duration: 2000 });
      },
      (error) => {
        console.error(error);
        this.snackBar.open('profile update failed', 'Close', { duration: 2000 });
      })
    }
  } 
  saveAddressChanges(): void {
    // perform save operation here
    this.isAddressEditMode = false;
    this.addressForm.disable();

    const data = {      
      street: this.addressForm.get('street')?.value,
      city: this.addressForm.get('city')?.value,
      state: this.addressForm.get('state')?.value,      
      zipcode: this.addressForm.get('zipcode')?.value       
    };
    if(this.isAddress404){
      this.employeeService.addAddressInfo(data).subscribe((result) => {
        console.log(result);        
        this.snackBar.open('Address updated successfully', 'Close', { duration: 2000 });
      },
      (error) => {
        console.error(error);
        this.snackBar.open('Address update failed', 'Close', { duration: 2000 });
      })
    }
    else{
      this.employeeService.updateAddressInfo(data).subscribe((result) => {
        console.log(result);        
        this.snackBar.open('Address updated successfully', 'Close', { duration: 2000 });
      },
      (error) => {
        console.error(error);
        this.snackBar.open('Address update failed', 'Close', { duration: 2000 });
      })
    }
  } 
}
