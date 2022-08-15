import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { news, RestService } from 'src/app/shared/rest.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: news[] = [];

  constructor(private rest:RestService, private route:Router) { }

  ngOnInit(): void {
    this.getNews();
  }

  //get all the news
  getNews(){
    this.rest.getValidatedNews().subscribe(
      (resp)=>{
        this.news = resp.news;
        //change the date format to dd/mm/yyyy
        for(let i=0; i<this.news.length; i++){
          this.news[i].date = this.changeDateFormat(this.news[i].date);
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

}
