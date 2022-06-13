import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//defining the backend
const endpoint = "http://localhost:3000/api/";

//on définit une interface lawyer pour l'utiliser partout
export interface Lawyer {
  full_name: string;
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

  //for the lawyers
  getLawyersAS(): Observable<any> {
    return this.http.get<Lawyer>(endpoint + 'lawyer/getLawyerAS/');
  }

  getLawyersCOL(): Observable<any> {
    return this.http.get<Lawyer>(endpoint + 'lawyer/getLawyerCOL/');
  }

  getLawyersCOLX(): Observable<any> {
    return this.http.get<Lawyer>(endpoint + 'lawyer/getLawyerCOLX/');
  }

  getLawyerCV(token: string): Observable<any> {
    return this.http.get<Lawyer>(endpoint + 'lawyer/getLawyerInfos/');
  }
  

  //for the cv lines
  removeLine(content: string): Observable<any> {
    return this.http.delete(endpoint + 'cv_line/remove/',{body: {"content": content}});
  }

  addLine(content: string, type: string, date: Date): Observable<any> {
    return this.http.post(endpoint + 'cv_line/create/',{"content":content , "type":type, "date":date});
  }

  updateLine(content: string, newContent: string, newDate: Date): Observable<any> {
    return this.http.put(endpoint + 'cv_line/update/',{"old_content":content , "new_content":newContent, "new_date":newDate});
  }

  //for the news
  addNews(title: string, content: string, date:Date): Observable<any> {
    return this.http.post(endpoint + 'news/create/',{"title":title , "content":content, "date":date});
  }

  updateNews(title: string, new_title:string, content: string, date:Date): Observable<any> {
    return this.http.put(endpoint + 'news/update/',{"old_title":title , "new_title":new_title, "new_content":content, "new_date":date});
  }

}