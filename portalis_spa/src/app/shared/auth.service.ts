import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { Lawyer } from './rest.service';
import { LawyerIdToken } from './lawyerIdToken';
import { User } from './user';
@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private http: HttpClient, public router: Router) {}

  endpoint: string = 'http://localhost:3000/api/'; 

  signin(lawyer: LawyerIdToken): Observable<any>{
    return this.http.post<LawyerIdToken>(this.endpoint + 'lawyer/login/', lawyer)
    .pipe(map(res => {
        console.log(res);
        if (res) {
          if(res.status == 'success'){
            localStorage.setItem('token', res.token);
            localStorage.setItem('lawyer_id', res.lawyer_id);
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    ))
  }

  login(lawyer: LawyerIdToken): Observable<any>{
    return this.http.post<any>(this.endpoint + 'lawyer/login/', lawyer).pipe(
      map(res => {
        return res;
      }),
      catchError(this.handleError)
    );
  } 

   // Error
   handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
      return msg
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      return msg;
    }
  }

  
}

