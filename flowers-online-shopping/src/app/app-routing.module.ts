import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterPageComponent } from './register-page/register-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProductsDisplayPageComponent } from './products-display-page/products-display-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductBirthdayComponent } from './products-display-page/product-birthday/product-birthday.component';
import { Router } from 'express';

const routes: Routes = [
  { path: 'signup/employee', component: RegisterPageComponent },
  { path: 'checkout', component: CheckoutPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '', component: HomePageComponent },
  { path: 'all', component: ProductsDisplayPageComponent },
  { path: 'bd', component: ProductBirthdayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
