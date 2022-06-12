import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { LawyerIdToken } from 'src/app/shared/lawyerIdToken';
import { Lawyer, RestService } from 'src/app/shared/rest.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {

  lawyer: LawyerIdToken = {lawyer_id: '', token: '', password: ''};

  constructor(private auth:AuthService, private rest: RestService, private route:Router) { }

  ngOnInit(): void {

  }

  signin(lawyer: LawyerIdToken): void {
    this.auth.signin(lawyer).subscribe(
      (resp) => {
        console.log("ok");
        if (resp == true) {
          this.route.navigate(['/avocats']);
        }
      }
    )
  }
}
