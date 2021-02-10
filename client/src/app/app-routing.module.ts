import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { MainComponent } from './main/main.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'cart', component: CartComponent,  canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'ordertracking', component: OrderTrackingComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
