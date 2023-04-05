import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { MatGridListModule } from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EditUserPageComponent } from './edit-user-page/edit-user-page.component';
import { OrderHistoryPageComponent } from './order-history-page/order-history-page.component';

import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { UserAccountPageComponent } from './user-account-page/user-account-page.component';
import { ReportPageComponent } from './report-page/report-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { ProductsDisplayPageComponent } from './products-display-page/products-display-page.component';
import { ProductDetailsComponent } from './products-display-page/product-details/product-details.component';
import { HomePageComponent } from './home-page/home-page.component';
import { IonicModule } from '@ionic/angular';
import { NewArrivalComponent } from './home-page/new-arrival/new-arrival.component';
import { PickStyleComponent } from './home-page/pick-style/pick-style.component';
import { TestimonialsComponent } from './home-page/testimonials/testimonials.component';
import { CtaComponent } from './home-page/cta/cta.component';
import { FooterComponent } from './home-page/footer/footer.component';
import { ProductBirthdayComponent } from './products-display-page/product-birthday/product-birthday.component';
import { AuthInterceptor } from './auth-interceptor';
import { AuthGuard } from './auth.guard';
import { MainNavigationComponent } from './home-page/main-navigation/main-navigation.component';
import { ProductCustomComponent } from './products-display-page/product-custom/product-custom.component';
import { ProductIndividualsComponent } from './products-display-page/product-individuals/product-individuals.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FilterSideBarComponent } from './products-display-page/filter-side-bar/filter-side-bar.component';
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
    HomePageComponent,
    NewArrivalComponent,
    PickStyleComponent,
    TestimonialsComponent,
    CtaComponent,
    FooterComponent,
    ProductBirthdayComponent,
    MainNavigationComponent,
    ProductCustomComponent,
    ProductIndividualsComponent,
    FilterSideBarComponent,
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
    IonicModule.forRoot(),
    MatTabsModule,
    MatTableModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule,
    ReactiveFormsModule,
    ImageCropperModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
