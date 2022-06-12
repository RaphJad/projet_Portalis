import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lawyer, lines_sch, lines_pub, lines_foe, RestService } from '../rest.service';

@Component({
  selector: 'app-lawyers',
  templateUrl: './lawyers.component.html',
  styleUrls: ['./lawyers.component.css']
})
export class LawyersComponent implements OnInit {

  lawyers_AS: Lawyer[] = [];
  lawyers_COL: Lawyer[] = [];
  lawyers_COLX: Lawyer[] = [];
   
  constructor(public rest:RestService, private route:Router) { }

  ngOnInit():void {
    this.getLawyersAS();
    this.getLawyersCOL();
    this.getLawyersCOLX();
  }

  getLawyersCOL(){
    this.rest.getLawyersCOL().subscribe(
      (resp) => {
        this.lawyers_COL = resp.lawyers;
      }
    )
  }
  async getLawyersAS(){
    this.rest.getLawyersAS().subscribe(
      async (resp) => {
        this.lawyers_AS = resp.lawyers;
      }
    )
  }
  getLawyersCOLX(){
    this.rest.getLawyersCOLX().subscribe(
      (resp) => {
        this.lawyers_COLX = resp.lawyers;
      }
    )
  }
}
