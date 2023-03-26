import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/loginservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'employee_management';

  isAuthendicated : boolean = false;

  constructor(private loginSerivce : LoginService){}
  
  ngOnInit(): void {
  //   this.loginSerivce.isLoggedIn.subscribe(isLoggedIn => {
  //     this.isAuthendicated = isLoggedIn;
  // })
  this.isAuthendicated = this.loginSerivce.isAuthenticated()
  }


}
