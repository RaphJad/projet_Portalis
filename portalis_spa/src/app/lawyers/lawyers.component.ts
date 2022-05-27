import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lawyer, RestService } from '../rest.service';

@Component({
  selector: 'app-lawyers',
  templateUrl: './lawyers.component.html',
  styleUrls: ['./lawyers.component.css']
})
export class LawyersComponent implements OnInit {

  lawyers: Lawyer[] = [];

  constructor(public rest:RestService, private route:Router) { }

  ngOnInit(): void {
    this.getLawyers(); //on appelle cette méthode à l'initialisation du composant
  }

  getLawyers(){
    this.rest.getLawyers().subscribe(
      (resp) => {
        console.log(resp);
        this.lawyers = resp.lawyers;
        console.log(this.lawyers)
      }
    )
  }
}
