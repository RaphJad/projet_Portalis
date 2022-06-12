import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//on importe la librairie http client
import { HttpClientModule } from '@angular/common/http';
import { LawyersComponent } from './components/lawyers/lawyers.component';

//on importe common
import { CommonModule } from '@angular/common';
import { SigninComponent } from './components/signin/signin.component';
import { CreateLawyerComponent } from './components/create-lawyer/create-lawyer.component';
import { LawyerProfileComponent } from './components/lawyer-profile/lawyer-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LawyersComponent,
    SigninComponent,
    CreateLawyerComponent,
    LawyerProfileComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
