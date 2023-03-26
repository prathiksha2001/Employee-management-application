import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { LoginService } from '../services/loginservice.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  selectedLink: string = '';
  constructor(private loginService : LoginService, private router : Router){}
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
