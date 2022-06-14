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
    this.rest.getAllNews().subscribe(
      (resp)=>{
        this.news = resp.news;
      }
    );
  }
}
