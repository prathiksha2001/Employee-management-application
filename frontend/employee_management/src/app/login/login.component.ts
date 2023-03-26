import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/loginservice.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';  //npm install ngx-cookie-service

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() isAuthendicated = new EventEmitter<boolean>()
  loginForm : FormGroup;
  showError : boolean = false;
  // router: any;
  constructor(private loginService : LoginService, private router : Router,private cookieService: CookieService){
    
    this.loginForm = new FormGroup({
      username: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  ngOnInit(): void {    
     
  }
  
  submitForm(){
    console.log(this.loginForm.get('username')?.value,this.loginForm.get('password')?.value)
    this.loginService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value).subscribe((result) => {
      console.log(result)
      // this.loginService.isloggedin$.next(true);
      if (result) {
        const decodedToken = result.decodedToken;
        if (decodedToken.role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (decodedToken.role === 'manager') {
          this.router.navigate(['manager']);
        } else if (decodedToken.role === 'employee') {
          this.router.navigate(['employee']);
        } 
        console.log('Logged in successfully');      
      } else {
        this.showError = true;
        console.log(result)
        console.log('Invalid login credentials');   
      }
    });
  }
  clearError() {
    this.showError =false;
  }
}



    // this.loginService.login(this.loginForm.get('username')?.value,
    // this.loginForm.get('password')?.value).subscribe((result) => {
    //   if (result) {
    //     if (this.loginService.decodedToken.role === 'admin') {
    //       this.router.navigate(['/admin']);
    //     } else if (this.loginService.decodedToken.role === 'manager') {
    //       this.router.navigate(['manager']);
    //     } else if (this.loginService.decodedToken.role === 'employee') {
    //       this.router.navigate(['employee']);
    //     } 
    //     console.log('Logged in successfully');      
    //   } else {
    //     this.showError = true;
    //     console.log('Invalid login credentials');   
    //   }
    // });
 

 
