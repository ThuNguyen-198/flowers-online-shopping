import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditUserPageComponent } from './edit-user-page/edit-user-page.component';
import { OrderHistoryPageComponent } from './order-history-page/order-history-page.component';

import { RegisterPageComponent } from './register-page/register-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProductsDisplayPageComponent } from './products-display-page/products-display-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductBirthdayComponent } from './products-display-page/product-birthday/product-birthday.component';

import { AuthGuard } from './auth.guard';
import { ProductCustomComponent } from './products-display-page/product-custom/product-custom.component';
import { ProductIndividualsComponent } from './products-display-page/product-individuals/product-individuals.component';
import { UserAccountPageComponent } from './user-account-page/user-account-page.component';
import { ReportPageComponent } from './report-page/report-page.component';

import { ProductSympathyComponent } from './products-display-page/product-sympathy/product-sympathy.component';

const routes: Routes = [
  //es
  {
    path: 'account/edit-account',
    component: EditUserPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'account/history',
    component: OrderHistoryPageComponent,
    canActivate: [AuthGuard],
  },

  { path: 'account', component: UserAccountPageComponent },
  { path: 'report', component: ReportPageComponent },
  { path: 'signup', component: RegisterPageComponent },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
  },
  { path: 'login', component: LoginPageComponent },
  { path: '', component: HomePageComponent },
  { path: 'all', component: ProductsDisplayPageComponent },
  { path: 'bd', component: ProductBirthdayComponent },

  { path: 'custom', component: ProductCustomComponent },
  { path: 'individuals', component: ProductIndividualsComponent },
  { path: 'sympathy', component: ProductSympathyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
