import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  decodedToken : any;
  isloggedin$ = new BehaviorSubject<boolean>(false);
  tokenExpirationTimer : any;
  // isManagerhasManager = false;

  constructor(private http: HttpClient, private router : Router) { }

  login(username: string, password: string): Observable<any> {
    const body = new FormData();
    body.append('username', username);
    body.append('password', password);

    return this.http.post('http://127.0.0.1:5000/login', body).pipe(
      map((response: any) => {
        if (response && response.access_token) {
          console.log(response)
          this.tokenExpirationTimer = setTimeout(() => {
            this.router.navigate(['/']);
          }, 30 * 60 * 1000);
          sessionStorage.setItem('authToken', response.access_token);
          const decodedToken = jwt_decode(response.access_token);
          this.decodedToken = decodedToken
          this.isloggedin$.next(true);
          return {
            token: response.access_token,
            decodedToken: decodedToken
          };
        } else {
          return null;
        }
      })
    );
  }

  logout(): void { 

    clearTimeout(this.tokenExpirationTimer);
    sessionStorage.removeItem('authToken');
    this.isloggedin$.next(false);
    this.router.navigate(['/'])
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('authToken');
  }

  get isLoggedIn(): Observable<boolean> {
    return this.isloggedin$.asObservable();
  }
}

  
  // login(username: string, password: string): Observable<boolean> {
    
  //   const headers = new HttpHeaders({
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     });
  //     const body = new HttpParams()
  //       .set('grant_type', 'password')
  //       .set('username', username)
  //       .set('password', password);
    
  //   return this.http.post<any>('http://127.0.0.1:5000/login',body.toString(), { headers})
  //     .pipe(
  //       map(response => {
  //         console.log(response)
  //         if (response && response.access_token) {
            
  //           this.tokenExpirationTimer = setTimeout(() => {
  //             this.router.navigate(['/']);
  //           }, 30 * 60 * 1000);

  //           localStorage.setItem('authToken', response.access_token);
  //           console.log(response.access_token)            
  //           this.decodedToken = jwt_decode(response.access_token); 
  //           console.log(this.decodedToken);
  //           this.isloggedin$.next(true);
  //           return true;
  //         }
          
  //         return false;
  //       }),
  //       catchError(error => {
          
  //         console.error(error);
          
  //         return of(false);
  //       })
  //     );
  // }


