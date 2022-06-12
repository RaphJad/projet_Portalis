import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//defining the backend
const endpoint = "http://localhost:3000/api/";

//on définit une interface lawyer pour l'utiliser partout
export interface Lawyer {
  full_name: string;
  birthdate: Date;
  lawyer_id: string;
  lines_sch: lines_sch[];
  lines_pub: lines_pub[];
  lines_foe: lines_foe[]; 
}

export interface lines_sch {
  content: string;
  date: Date;
  type: string;
}

export interface lines_pub {
  content: string;
  date: Date;
  type: string;
}

export interface lines_foe {
  content: string;
  date: Date;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  
  getLawyersAS(): Observable<any> {
    return this.http.get<Lawyer>(endpoint + 'lawyer/getLawyerAS/');
  }

  getLawyersCOL(): Observable<any> {
    return this.http.get<Lawyer>(endpoint + 'lawyer/getLawyerCOL/');
  }

  getLawyersCOLX(): Observable<any> {
    return this.http.get<Lawyer>(endpoint + 'lawyer/getLawyerCOLX/');
  }

  getCVlawyer(lawyer_id: string): Observable<any> {
    var params = new HttpParams().set('lawyer_id', lawyer_id);
    return this.http.get(endpoint + 'cv_line/getLinesByLawyer', { params: params });
  }
}