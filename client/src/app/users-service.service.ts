

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';




@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


  constructor(private afAuth: AngularFireAuth) { }
   online=false;
  getCurrentUser() {
    return new Promise(
      (resolve, reject) => {
        const user = this.afAuth.authState.subscribe(
          // tslint:disable-next-line: no-shadowed-variable
          user => {
            resolve(user);
          //console.log(user.displayName);
          if(user!= null)
          this.online=true;
          else  this.online=false;
        } , err =>{resolve(null)
          console.log("null")
          this.online=false;} 
        );
      }
    );
  }

  isOnline(){
return this.online;
  }

}
