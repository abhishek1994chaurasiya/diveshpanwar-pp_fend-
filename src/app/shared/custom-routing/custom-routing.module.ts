import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import { ErrorComponent } from '../../error/error.component';
import { SignupComponent } from '../../signup/signup.component';
import { LoginComponent } from 'src/app/login/login.component';
import { CartComponent } from 'src/app/cart/cart.component';
import { SingleProductComponent } from 'src/app/single-product/single-product.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product/:productId', component: SingleProductComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class CustomRoutingModule {}
