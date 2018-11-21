import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import { ErrorComponent } from '../../error/error.component';
import { SignupComponent } from '../../signup/signup.component';
import { LoginComponent } from 'src/app/login/login.component';

const appRoutes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent},
  { path: '**' , component: ErrorComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CustomRoutingModule { }
