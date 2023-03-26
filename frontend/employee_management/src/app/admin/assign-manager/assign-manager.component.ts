import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/models/employee.model';
import { AdminService } from 'src/app/services/adminservice.service';

@Component({
  selector: 'app-assign-manager',
  templateUrl: './assign-manager.component.html',
  styleUrls: ['./assign-manager.component.css']
})
export class AssignManagerComponent implements OnInit {
  selectedEmployee: number = 0;
  selectedManager: Employee | null = null;
  managerResults: Employee[] = [];
  employees : Employee[] = [];
  managers : Employee[] = [];
  managerAssign : FormGroup;
  departments : any
  filteredManagers: any[] | undefined;

  constructor(private adminService : AdminService,private snackBar: MatSnackBar){
    this.managerAssign = new FormGroup({
      employee_id : new FormControl(null,Validators.required),
      manager_id : new FormControl(null, Validators.required)
    })

  }
  ngOnInit(): void {
    this.adminService.getEmployeeList().subscribe((responses) => {
      console.log(responses)
      responses.forEach(employee => {
        // if (employee.user_type === 'employee'){
        //   this.employees.push(employee)
        // }
        if(employee.user_type === 'manager'){
          this.managers.push(employee)
        }
        this.employees.push(employee)
      });
    })
    this.adminService.getdepartmentList().subscribe((res)=>{
      this.departments = res;
  })
  }

  // searchManager(event: any): void {
  //   const inputValue = (event.target as HTMLInputElement).value;
  //   this.managerResults = this.managers.filter(manager => manager.email.toLowerCase().includes(inputValue.toLowerCase()));
  // }


  // selectManager(manager: Employee) {
  //   this.selectedManager = manager;    
  // }

  onEmployeeSelect() {
    console.log('Selected Employee ID:', this.selectedEmployee);
  
    let selectedEmployee: any;
    // console.log(this.employees)
    for (let i = 0; i < this.employees.length; i++) {
      console.log(this.employees[i], this.employees[i].id, this.selectedEmployee)
      if (this.employees[i].id === Number(this.selectedEmployee)) {
        selectedEmployee = this.employees[i];
        break;
      }
    }
    console.log(selectedEmployee)
    // Filter managers based on selected employee's department
    this.filteredManagers = this.managers.filter(manager => manager.department === selectedEmployee?.department);
    console.log('Filtered Managers:', this.filteredManagers);
  }


  assignManager(){
    this.adminService.assignManager(this.managerAssign.get('employee_id')?.value,
    this.managerAssign.get('manager_id')?.value).subscribe((response)=>{
      if(response){
        this.snackBar.open('Manager Assigned Successfully', 'Close', { duration: 2000 });
        this.managerAssign.reset()
      }      
    },
    (error)=>{
      this.snackBar.open('Error Occured', 'Close', { duration: 2000 });
    })
    
  }
  
}
