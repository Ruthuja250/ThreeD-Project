import {NgModule } from '@angular/core';
import {BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import ReactiveFormsModule here
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { AuthServiceService } from './services/auth-service.service';
import { PaymentComponent } from './components/payment/payment.component';
import {  RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserdetailsComponent } from './components/userdetails/userdetails.component';
import { UserordersComponent } from './components/userorders/userorders.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { SuggestedProductComponent } from './components/suggested-product/suggested-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { OpenProductDetailsDirective } from './components/open-product-details.directive';
import { OpenProductsDirective } from './components/open-products.directive';
import { SampleComponent } from './sample/sample.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    HomepageComponent,
    LogoutComponent,
    AccountPageComponent,

    AdmindashboardComponent,
    PaymentComponent,
    UserdetailsComponent,
    UserordersComponent,
    ProductComponent,
    ProductsComponent,
    SuggestedProductComponent,
    ProductDetailsComponent,
    OpenProductDetailsDirective,
    OpenProductsDirective,
    SampleComponent,
    FooterComponent,
    HeaderComponent,
  
 
 
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule ,
    ReactiveFormsModule,
    ButtonModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    })  

  ],
  providers: [
    AuthServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }











