// @ts-nocheck
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserServiceService } from './users-service.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class Auth2Guard implements CanActivate {
  // tslint:disable-next-line: no-shadowed-variable
  constructor(private UsersService: UserServiceService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any>{
    return new Promise(
      (resolve,reject) =>{
        this.UsersService.getCurrentUser().then(user =>{
          if(user){
            if(user.email=="yotamts@gmail.com")
            return resolve(true)
          }
          else{
            this.router.navigate(['']);
            return resolve(false);
          }
        })
      }
    )
  }

}
