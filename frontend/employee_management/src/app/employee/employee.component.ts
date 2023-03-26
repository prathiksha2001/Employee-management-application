import { Component } from '@angular/core';
import { LoginService } from '../services/loginservice.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  selectedLink: string = '';

  constructor(private loginService: LoginService){}
  selectLink(link: string) {
    this.selectedLink = link;
  }

  shouldRenderComponent(componentName: string): boolean {
    return this.selectedLink === componentName;
  }

  logout(){
    console.log('logout')
    this.loginService.logout()
      
  }
}
