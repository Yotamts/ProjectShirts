

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


  constructor(private afAuth: AngularFireAuth) { }
 
  getCurrentUser()  :Promise<any>  {
    return new Promise<any>(
      (resolve, reject) => {
        const user = firebase.auth().onAuthStateChanged(
          // tslint:disable-next-line: no-shadowed-variable
          (user) => {
            console.log(user);
            user ? resolve(user) : resolve(null);
          }
        );
      }
    );
  }

}
