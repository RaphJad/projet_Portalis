import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lawyer, news, RestService } from 'src/app/shared/rest.service';
import { rawLawyer } from 'src/app/shared/rawLawyer';

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
  //to add a line to the CV
  content2add:string = "";
  type2add:string = "";
  date2add:Date = new Date();
  //to modify a line of the CV
  content2modify:string = "";
  newContent:string = "";
  newDate:Date = new Date();
  //to remove a line of the CV
  content2remove:string = "";
  //to add a news
  title2add:string = "";
  contentNews2add:string = "";
  dateNews:Date = new Date();
  //to modify a news
  title2modify:string = "";
  newTitleNews:string = "";
  newContentNews:string = "";
  newDateNews:Date = new Date();
  //to add a lawyer
  lawyer2add:rawLawyer = {
    first_name: '',
    last_name: '',
    birthdate: new Date(),
    lawyer_id: '',
    password: '',
    status: ''
  }
  //to remove a lawyer
  lawyer_id2remove:string = "";

  //news array for the unvalidated news
  unvalidatedNews: news[] = [];

  constructor(private rest:RestService, private route:Router) { }

  ngOnInit(): void {
    this.getLawyer();
    this.getUnvalidatedNews();
  }
  //For the lawyer
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
  addLawyer(){
    if(this.lawyer2add.status == "Associé(e)"){
      this.lawyer2add.status = "AS";
    } else if(this.lawyer2add.status == "Collaborateur/Collaboratrice"){
      this.lawyer2add.status = "COL";
    }
    else{
      this.lawyer2add.status = "COLX";
    }
    this.rest.addLawyer(this.lawyer2add).subscribe();
    window.location.reload();
  }
  removeLawyer(){
    this.rest.removeLawyer(this.lawyer_id2remove).subscribe();
    window.location.reload();
  }
  //For the cv lines  
  addLine(){
    if(this.type2add == "Parcours académique"){
      this.type2add = "sch";
    } else if (this.type2add == "Publications et autres"){
      this.type2add = "pub";
    }else{
      this.type2add = "foe";
    }
    this.rest.addLine(this.content2add, this.type2add, this.date2add).subscribe();
    window.location.reload();
  }
  
  updateLine(){
    this.rest.updateLine(this.content2modify, this.newContent, this.newDate).subscribe();
    window.location.reload();
  }
  removeLine(content:string){
    this.rest.removeLine(content).subscribe();
    window.location.reload();
  }

  //For the news
  addNews(){
    this.rest.addNews(this.title2add, this.contentNews2add, this.dateNews).subscribe();
    window.location.reload();
  }

  updateNews(){
    this.rest.updateNews(this.title2modify, this.newTitleNews, this.newContentNews, this.newDateNews).subscribe();
    window.location.reload();
  }

  getUnvalidatedNews(){
    this.rest.getUnvalidatedNews().subscribe(
      (resp) => {
        this.unvalidatedNews = resp.news;
        for(let i=0; i<this.unvalidatedNews.length; i++){
          this.unvalidatedNews[i].date = this.changeDateFormat(this.unvalidatedNews[i].date);
        }
      }
    );
  }
   //change the date format to dd/mm/yyyy
  changeDateFormat(date:string){
    let dateArray = date.split("-");
    let newDate = dateArray[2]+"/"+dateArray[1]+"/"+dateArray[0];
    return newDate;
  }

  validateNews(title:string, author:string){
    console.log(title);
    this.rest.validateNews(title, author).subscribe();
    window.location.reload();
  }

  removeNews(title:string, author:string){
    this.rest.removeNews(title, author).subscribe();
    window.location.reload();
  }
}
