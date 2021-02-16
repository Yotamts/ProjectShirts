import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import * as firebase from 'firebase';
import * as firebase2 from 'firebase/app';
import { UserServiceService } from '../users-service.service';
import { AngularFireModule } from '@angular/fire';
import { OrderTrackingComponent } from '../order-tracking/order-tracking.component';
import { Shirt } from '../shirt';
import { User } from '../user';
import { UsersService } from '../users.service';






@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private userService:UserServiceService, private UsersService2:UsersService) { }
  @Input() users:User[];
  @Output() userToParent = new EventEmitter();

  users2:User[]=[];
 guestName:string="אורח/ת";
 myUser;
 convertedUser:User;
 //user=this.userService.getCurrentUser();
myUsersArr:User[]=[];
cartCount=1;
 
  checkCart(){
    
    if(this.convertedUser.shoppingCart.length==0){
      document.getElementById("cartCount").style.display="none";
      console.log("1");
    } 
    else{
      console.log(this.convertedUser.shoppingCart.length);
      this.cartCount=this.convertedUser.shoppingCart.length;
      document.getElementById("cartCount").style.display="unset";
      console.log("2");
    }
    
    
  }

 moveToParent(){
   this.userToParent.emit(this.convertedUser);
 }
 
 logout(){
  this.auth.googleLogout().then(data => {
    //this.router.navigate(['']);
    this.guestName="אורח/ת";
    (document.getElementById("logOut_span")).style.display="none";
    this.myUser=null;
    document.getElementById("cart").style.cursor="no-drop";
    document.getElementById("cart").style.pointerEvents="none";
    document.getElementById("orderTracking").style.cursor="no-drop";
    document.getElementById("orderTracking").style.pointerEvents="none";
    document.getElementById("orderTracking").setAttribute('href', 'javascript:window.location.href=window.location.href');
    document.getElementById("cart1").setAttribute('href', 'javascript:window.location.href=window.location.href');
    this.checkCart();
    location.reload();
    
  });}
 
convertUser(user){
  
  for(let i = 0; i<this.users2.length; i++){
    if(user.email==this.users2[i].mail){
      console.log(this.users2[i]);
      return this.users2[i];
      
    } 
  }
  let cartArr:Shirt[]=[];
  let purchasesArr:Shirt[]=[];
  let tempuser:User={name:user.displayName,mail:user.email,isManager:false,isGuest:true,address:null,phone:null,shoppingCart:cartArr,purchases:purchasesArr}
  return tempuser;
  location.reload();
  
}

  loginWithGoogle() {
    this.auth.googleLogin().then(user => {
      this.myUser=user;
      this.guestName=user.user.displayName;
    //  this.router.navigate(['cart']);
    (document.getElementById("logOut_span")).style.display="inline";
     document.getElementById("cart").style.cursor="pointer";
     document.getElementById("cart").style.pointerEvents="unset";
     document.getElementById("orderTracking").style.cursor="pointer";
     document.getElementById("orderTracking").style.pointerEvents="unset";
     document.getElementById("orderTracking").setAttribute('href', 'http://localhost:4200/ordertracking');
     document.getElementById("cart1").setAttribute('href', 'http://localhost:4200/cart');
     let tepm = false;
     for(let i = 0 ; i<this.users.length; i++){
       if(this.users2[i].mail == user.user.email){
         tepm =true;
         
    location.reload();
         break;
       }
     }
     if(tepm==false){
       let cartArr:Shirt[]=[];
       let purchasesArr:Shirt[]=[];
       
      let tempuser:User={name:user.user.displayName,mail:user.user.email,isManager:false,isGuest:true,address:null,phone:null,shoppingCart:cartArr,purchases:purchasesArr}
       this.UsersService2.add(tempuser).subscribe(res => {
        console.log("new user");
        this.checkCart();
    location.reload();
      });
     }
    });
    
  }
  goToCart(){
    if(!this.userService.isOnline())alert("על מנת לעבור לסל הקניות עליך לבצע התחברות לאתר");
   
     
  }

  goToTracking(){
    if(!this.userService.isOnline())alert("על מנת לצפות בהזמנות עליך לבצע התחברות לאתר");
    
     
    
  }

  usersLength(){
    return this.users.length;
  }
  
  ngOnInit(): void {
    this.UsersService2.getAll().subscribe(users => this.users2 = users);
    firebase.initializeApp;
    firebase2.initializeApp;
    this.userService.getCurrentUser().then(user => {
      let bool =this.userService.isOnline();
      if(bool){
        document.getElementById("orderTracking").setAttribute('href', 'http://localhost:4200/ordertracking');
        document.getElementById("cart1").setAttribute('href', 'http://localhost:4200/cart');
        this.myUser=user;
        let bool=false;
        let tempUser:User;
      
      this.convertedUser=this.convertUser(this.myUser);
     
      this.checkCart();
        this.moveToParent();
        
        console.log(this.convertedUser);
        console.log(this.convertedUser.shoppingCart);
        console.log(this.myUser.displayName);
        this.guestName=this.myUser.displayName;
        (document.getElementById("logOut_span")).style.display="inline";
      }
      else {
        document.getElementById("cart").style.cursor="no-drop";
      document.getElementById("orderTracking").style.cursor="no-drop";}
    })
    
  }

}

