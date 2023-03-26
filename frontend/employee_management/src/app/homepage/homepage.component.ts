import { Component } from '@angular/core';
import { LoginService } from '../services/loginservice.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  IsAuthenticated: boolean = false;

  constructor(private loginService : LoginService){
    this.loginService.isLoggedIn.subscribe(isLoggedIn => {
      this.IsAuthenticated = isLoggedIn;
      console.log('isAuthenticated', this.IsAuthenticated);
    });
  }
}
