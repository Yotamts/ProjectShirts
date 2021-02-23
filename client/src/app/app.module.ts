import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './about/about.component';



import { environment } from 'src/environments/environment';


import { from } from 'rxjs';
import { NgModule } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductComponent } from './product/product.component';
import { ContactComponent } from './contact/contact.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { ManagementComponent } from './management/management.component';
import { PayComponent } from './pay/pay.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
NavBarComponent,
    AboutComponent,
    ProductComponent,
    CartComponent,
    ContactComponent,
    OrderTrackingComponent,
    ContactUsComponent,
    ManagementComponent,
    PayComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
 
})
export class AppModule { }
