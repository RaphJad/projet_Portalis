import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCvLineComponent } from './add-cv-line/add-cv-line.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HomeComponent } from './components/home/home.component';
import { LawyerProfileComponent } from './components/lawyer-profile/lawyer-profile.component';
import { LawyersComponent } from './components/lawyers/lawyers.component';
import { NewsComponent } from './components/news/news.component';
import { SigninComponent } from './components/signin/signin.component';
const routes: Routes = [
  {
    path:'avocats',
    component: LawyersComponent
  },
  {
    path:'news',
    component: NewsComponent
  },
  {
    path: 'login',
    component: SigninComponent
  },
  {
    path:'lawyer_profile',
    component: LawyerProfileComponent
  },
  {
    path:'error',
    component: ErrorPageComponent
  },
  {
    path:'',
    component: HomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 

}
