import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/loginservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  activeComponent = 'home'
  isAuthendicated : boolean = false;
  
  constructor(private loginService : LoginService){
    this.loginService.isLoggedIn.subscribe(isLoggedIn => {
      this.isAuthendicated = isLoggedIn;
      console.log('isAuthenticated', this.isAuthendicated);
    });
  }

  ngOnInit(): void {
    
  }
  logout(){
    console.log('logout')
    this.loginService.logout()    
  }
  setActiveComponent(component: string): void {
    this.activeComponent = component;
  }
}
