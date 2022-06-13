import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LawyerProfileComponent } from './components/lawyer-profile/lawyer-profile.component';
import { LawyersComponent } from './components/lawyers/lawyers.component';
import { SigninComponent } from './components/signin/signin.component';
const routes: Routes = [
  {
    path:'avocats',
    component: LawyersComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 

}
