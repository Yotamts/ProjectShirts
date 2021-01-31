import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';
import { MainComponent } from './main/main.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'cart', component: CartComponent,  canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
