import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lawyer, RestService } from 'src/app/shared/rest.service';

@Component({
  selector: 'app-lawyer-profile',
  templateUrl: './lawyer-profile.component.html',
  styleUrls: ['./lawyer-profile.component.css']
})
export class LawyerProfileComponent implements OnInit {

  lawyer: Lawyer= {
    full_name: '',
    lawyer_id: '',
    lines_sch: [],
    lines_pub: [],
    lines_foe: []
  };

  content2add:string = "";
  type2add:string = "";
  date2add:Date = new Date();
  content2remove:string = "";

  constructor(private rest:RestService, private route:Router) { }

  ngOnInit(): void {
    this.getLawyer();
  }

  getLawyer(){
      var token = localStorage.getItem('token');
      if(token == null){
        token = "";
      }
      this.rest.getLawyerCV(token).subscribe(
        (resp) => {
          console.log(resp);
          this.lawyer.full_name = resp.full_name;
          this.lawyer.lawyer_id = resp.lawyer_id;
          this.lawyer.lines_sch = resp.lines_sch;
          this.lawyer.lines_pub = resp.lines_pub;
          this.lawyer.lines_foe = resp.lines_foe;
        }
      )
    }

  addLine(){
    console.log(this.content2add);
    console.log(this.type2add);
    console.log(this.date2add);
    this.rest.addLine(this.content2add, this.type2add, this.date2add).subscribe();
    window.location.reload();
  }
  addNews(){
    this.route.navigate(['/add_news']);
  }
  removeLine(content:string){
    this.rest.removeLine(content).subscribe();
    window.location.reload();
  }
}
