import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portalis_spa';

  constructor(private router:Router){};
  
  isloggedIn: string = "pas ok";

  ngOnInit(){
    
  }

  
    
  toLogin(){
    this.router.navigate(['/login']);
  }
  
}
