import { HttpErrorResponse } from '@angular/common/http';
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

  lawyer: LawyerIdToken = {lawyer_id: '', token: '', password: '', status: ''};
  show_wrong_password_or_id: boolean = false;
  constructor(private auth:AuthService, private rest:RestService, private route:Router) { }

  ngOnInit(): void {

  }

  login(lawyer: LawyerIdToken): void {
    this.auth.login(lawyer).subscribe(
      (resp) => {
        if(resp){
          let resSTR = JSON.stringify(resp);
          let resJSON = JSON.parse(resSTR);
          if(resJSON.status == 'success'){
            localStorage.setItem('token', resJSON.token);
            localStorage.setItem('lawyer_id', resJSON.lawyer_id);
            this.route.navigate(['/lawyer_profile']);
            localStorage.setItem('isLoggedIN', "ok");
          }
          else{
            this.show_wrong_password_or_id = true;
          }
        }
        else{
          this.route.navigate(['/error']);
        }
      }
    );
  }
}
