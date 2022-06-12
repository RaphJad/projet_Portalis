import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { Lawyer } from './rest.service';

@Injectable({
  providedIn: 'root',
})

export class User{
  firstname!: string;
  lastname!: string;
  password!: string;
  user_id!: string;
}

export class LawyerIdToken{
  lawyer_id!: string;
  token!: string;
}

const endpoint: string = 'http://localhost:3000/api/'; 

export class AuthService {
  constructor(private http: HttpClient, public router: Router) {}
  
  signin(lawyer: LawyerIdToken, password: string): Observable<any>{
    var option = {
      body: {"lawyer_id": lawyer.lawyer_id, "password": password},
    }; 
    return this.http.post<LawyerIdToken>(endpoint + 'lawyer/login/', option).pipe(
      map(res => {
        if (res) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('lawyer_id', JSON.stringify(res.lawyer_id));
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