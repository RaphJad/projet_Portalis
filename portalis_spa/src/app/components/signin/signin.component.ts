import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LawyerIdToken } from 'src/app/shared/auth.service';
import { Lawyer } from 'src/app/shared/rest.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
