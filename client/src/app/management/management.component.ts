import { Component, OnInit } from '@angular/core';
import { Shirt } from '../shirt';
import { ShirtsService } from '../shirts.service';
import { User } from '../user';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  constructor( private UsersService2:UsersService, private shirtsApi:ShirtsService) { }

  tempUsers:User[]=[];
  tempUsers2:User[]=[];
  tempuser:User;
  shirts:Shirt[]=[];
 
  

  showUsers(){
    this.UsersService2.getAll().subscribe(users => this.tempUsers = users);
    document.getElementById("productsDiv").style.display="none";
    document.getElementById("ordersDiv").style.display="none";
    document.getElementById("usersDiv").style.display="unset";
    document.getElementById("usersBTN").style.backgroundColor="rgb(159 180 244)";
    document.getElementById("ordersBTN").style.backgroundColor="transparent";
    document.getElementById("productsBTN").style.backgroundColor="transparent";
    
  }
 
  delFromCart(i,j){
    this.shirtsApi.getAll().subscribe(shirts =>{ this.shirts = shirts;
      console.log(this.shirts);
      let shirt1:Shirt = this.shirts.find(element => element.title == this.tempUsers[i].shoppingCart[j].title);
    let drop=this.tempUsers[i].shoppingCart.splice(j, 1);
    this.UsersService2.update(this.tempUsers[i]).subscribe(res => {
      console.log("user updated");
    });
    shirt1.stock++;
        if(shirt1.stock>0) shirt1.in_stock=true;
        this.shirtsApi.update(shirt1).subscribe(res => {
         console.log("shirt added");
        
       });
  });
  }
  showUserDet(i){
    if( document.getElementById(`user${i}`).style.display=="none")
   document.getElementById(`user${i}`).style.display="table-row";
   else  document.getElementById(`user${i}`).style.display="none";
  }
  showProDet(i){
    if( document.getElementById(`shirt${i}`).style.display=="none")
   document.getElementById(`shirt${i}`).style.display="table-row";
   else  document.getElementById(`shirt${i}`).style.display="none";
  }
  unshowUserDet(i){
    document.getElementById(`user${i}`).style.display="none";
   }
   unshowShirtDet(i){
    document.getElementById(`shirt${i}`).style.display="none";
   }
   imgUpdate(v){
    console.log(v);
    
   }
   findUser(){
     this.tempUsers=[];
   }
   findUser2(v){
     console.log("hey");
     console.log("v");
    this.UsersService2.getAll().subscribe(users =>{
      this.tempUsers2 = users;
      this.tempUsers =this.tempUsers2.filter(element => element.name.includes(v) || element.mail.includes(v) || element.phone.includes(v) || element.address.includes(v));
    } );
    
   
  }
    
  showProducts(){
    this.shirtsApi.getAll().subscribe(shirts =>{ this.shirts = shirts;
    document.getElementById("productsDiv").style.display="unset";
    document.getElementById("ordersDiv").style.display="none";
    document.getElementById("usersDiv").style.display="none";
    document.getElementById("usersBTN").style.backgroundColor="transparent";
    document.getElementById("ordersBTN").style.backgroundColor="transparent";
    document.getElementById("productsBTN").style.backgroundColor="rgb(159 180 244)";})
  }
  showOrders(){
    document.getElementById("productsDiv").style.display="none";
    document.getElementById("ordersDiv").style.display="unset";
    document.getElementById("usersDiv").style.display="none";
    document.getElementById("usersBTN").style.backgroundColor="transparent";
    document.getElementById("ordersBTN").style.backgroundColor="rgb(159 180 244)";
    document.getElementById("productsBTN").style.backgroundColor="transparent";
  }
   
  showAllUsers(){
    
  }

  ngOnInit(): void {
  }

}
