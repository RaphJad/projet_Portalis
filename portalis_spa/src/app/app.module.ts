import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//pour gerer les formulaires avec angular
import { FormsModule } from '@angular/forms';

//on importe la librairie http client
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LawyersComponent } from './components/lawyers/lawyers.component';
import { AuthInterceptor } from './shared/authconfig.interceptor';
//on importe common
import { CommonModule } from '@angular/common';
import { SigninComponent } from './components/signin/signin.component';
import { CreateLawyerComponent } from './components/create-lawyer/create-lawyer.component';
import { LawyerProfileComponent } from './components/lawyer-profile/lawyer-profile.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { AddCvLineComponent } from './add-cv-line/add-cv-line.component';
import { AddNewsComponent } from './add-news/add-news.component';

@NgModule({
  declarations: [
    AppComponent,
    LawyersComponent,
    SigninComponent,
    CreateLawyerComponent,
    LawyerProfileComponent,
    ErrorPageComponent,
    AddCvLineComponent,
    AddNewsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
