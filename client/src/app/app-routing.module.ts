import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth.guard';
import { Auth2Guard } from './auth2.guard';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { MainComponent } from './main/main.component';
import { ManagementComponent } from './management/management.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { PayComponent } from './pay/pay.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'cart', component: CartComponent,  canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'ordertracking', component: OrderTrackingComponent, canActivate: [AuthGuard]},
  {path: 'manage', component: ManagementComponent, canActivate: [Auth2Guard]},
  {path: 'pay', component: PayComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
