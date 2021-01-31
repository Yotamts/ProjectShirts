import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { rejects } from 'assert';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserServiceService } from './users-service.service';
import { UsersService } from './users.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private router: Router, private UserService: UserServiceService ) {}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
      return new Promise(
        // tslint:disable-next-line:whitespace
       (resolve)=>{
         this.UserService.getCurrentUser().then(user=>{
           if(user){
             resolve(true);
           }else{
             resolve(false);
             this.router.navigate(['']);
           }
         })
       }
      );

  }

}
