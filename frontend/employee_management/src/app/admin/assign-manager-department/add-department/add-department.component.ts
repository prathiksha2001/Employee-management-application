import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/adminservice.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit{
  departments : any
  inputValue : string;
  constructor(private adminService: AdminService,private snackBar: MatSnackBar){
    this.inputValue = "";
  }
  ngOnInit(): void {
    this.adminService.getdepartmentList().subscribe((res)=>{
        this.departments = res;
    })
  }
  addItem(){
    const data = {
      'name' : this.inputValue
    }
    // this.departments.push(this.inputValue)
    this.adminService.adddepartmentList(data).subscribe((res)=>{
      if(res){
        this.snackBar.open('Department Added Successfully', 'Close', { duration: 2000 });
        
      }      
    },
    (error)=>{
      this.snackBar.open('Error Occured', 'Close', { duration: 2000 });
    })

  }

}
