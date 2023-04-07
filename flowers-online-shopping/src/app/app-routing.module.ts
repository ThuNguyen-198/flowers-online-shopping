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

// eh?
import { UserAccountPageComponent } from './user-account-page/user-account-page.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  //es
  { path: 'account/edit-account', component: EditUserPageComponent },
  { path: 'account/history', component: OrderHistoryPageComponent },
  //{ path: 'account/history', component: OrderHistoryPageComponent, canActivate: [AuthGuard] },

  { path: 'account', component: UserAccountPageComponent },
  { path: 'signup', component: RegisterPageComponent },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
  },
  { path: 'login', component: LoginPageComponent },
  { path: '', component: HomePageComponent },
  { path: 'all', component: ProductsDisplayPageComponent },
  { path: 'bd', component: ProductBirthdayComponent },
  {
    path: ':id',
    component: UserAccountPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
