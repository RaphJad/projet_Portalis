import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
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
    return this.http.post<LawyerIdToken>(this.endpoint + 'lawyer/login/', lawyer).pipe(
      map(res => {
        console.log(res);
        if (res) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('lawyer_id', res.lawyer_id);
          return true;
        }
        else{
          return false;
        }
      }
      )
    )
  }
}