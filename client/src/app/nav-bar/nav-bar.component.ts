import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { UserServiceService } from '../users-service.service';





@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private userService:UserServiceService) { }

 guestName:String="אורח/ת";
 user=this.userService.getCurrentUser();
 


  loginWithGoogle() {
    this.auth.googleLogin().then(user => {
    //  this.router.navigate(['cart']);
    });
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user.displayName);
       this.guestName=user.displayName.toString();
       console.log(this.guestName);
      } else {
        // No user is signed in.
      }
    });

    
  }
  ngOnInit(): void {
  
  }

}

