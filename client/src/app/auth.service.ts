import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import * as firebase from 'firebase/app';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fbAuth: AngularFireAuth) { }


  googleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.fbAuth.signInWithPopup(provider).then(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  googleLogout() {
    return new Promise(
      (resolve, reject) => {
        if (firebase.auth().currentUser) {
          this.fbAuth.signOut();
          resolve(true);
        } else {
          reject('user not found');
        }
      }
    );

  }

}
