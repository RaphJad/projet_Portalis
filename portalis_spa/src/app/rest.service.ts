import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//defining the backend
const endpoint = "http://localhost:3000/api/";

//on définit une interface lawyer pour l'utiliser partout
export interface Lawyer {
  firstname: string;
  lastname: string;
  birthdate: Date;
  lawyer_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  getLawyers(): Observable<any> {
    return this.http.get(endpoint + 'lawyer/getLawyers');
  }

}
