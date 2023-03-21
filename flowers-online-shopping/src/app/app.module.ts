import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { UserAccountPageComponent } from './user-account-page/user-account-page.component';
import { ReportPageComponent } from './report-page/report-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { ProductsDisplayPageComponent } from './products-display-page/products-display-page.component';
import { ProductDetailsComponent } from './products-display-page/product-details/product-details.component';


@NgModule({
  declarations: [
    AppComponent,

    LoginPageComponent,
    RegisterPageComponent,
    UserAccountPageComponent,
    ReportPageComponent,
    CheckoutPageComponent,
    ProductsDisplayPageComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatExpansionModule,
    MatTabsModule,
    MatTableModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
