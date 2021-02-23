import { literal } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Order } from '../order';
import { OrdersService } from '../orders.service';
import { Shirt } from '../shirt';
import { ShirtsService } from '../shirts.service';
import { User } from '../user';
import { UsersService } from '../users.service';






@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
 
  constructor(private usersApi:UsersService,private ordersApi:OrdersService, private shirtsApi:ShirtsService) { }
  users:User[]=[];
  shirts:Shirt[]=[];
  filterShirts:Shirt[]=[];
  orders:Order[]=[];
  myUser:User;
  TempCart:Shirt[];

  tempshirt:Shirt={id:1,title:"temp",league:"temp", team:"tepm", price:0, goalkeeper:false,img:"assets/img/shirts/italy/milan_away_20.jpg",in_stock:true,size:"m",num:10,stock:20,name:"tepm",long_sleeves:false,quantity:2};
  tepmBool=true;
  filterteams={Arsenal:false,ManchesterUnited:false,manchesterCity:false,liverpool:false,lyon:false,marseille:false,psg:false,bayern:false,dortmund:false,juventus:false,millan:false,roma:false,atletico:false,barcelona:false,real:false}
 
userFromNav(user:User){
this.myUser=user;
  }

  changeTempSirt(shirt:Shirt){
    this.tempshirt=shirt;
    this.tepmBool=shirt.in_stock;
  }
priceSort(v){
  if(v=="lowPrice") this.filterShirts.sort(function(a, b){return a.price - b.price});
  if(v=="highPrice") this.filterShirts.sort(function(a, b){return b.price - a.price});
}


addToCart(size, num, name,long:boolean ){
 this.tempshirt.size=size;
 this.tempshirt.num=num;
 this.tempshirt.name=name;
 this.tempshirt.long_sleeves=long;
 console.log(this.myUser.shoppingCart);
 console.log(this.myUser);
 this.myUser.shoppingCart.push(this.tempshirt);
 this.usersApi.update(this.myUser).subscribe(res => {
  console.log("cart updated");
});
 console.log(this.tempshirt);
 
 let shirt1:Shirt = this.shirts.find(element => element.title == this.tempshirt.title);

 shirt1.stock--;
 if(shirt1.stock==0) shirt1.in_stock=false;
 this.shirtsApi.update(shirt1).subscribe(res => {
  console.log("shirt added");
  location.reload();
  alert("נוסף לסל")
});
 
 
}


 selectLeague(value,price){
   if(value!="all"){ this.filterShirts=this.shirts.filter(a=>a.league==value);}
   else this.filterShirts =this.shirts;
   this.priceSort(price);
  
   if(value=="spain"){
     (document.getElementById("englandCheckBox")).style.display="none";
     (document.getElementById("franceCheckBox")).style.display="none";
     (document.getElementById("germanyCheckBox")).style.display="none";
     (document.getElementById("italyCheckBox")).style.display="none";
     (document.getElementById("spainCheckBox")).style.display="block";
     (document.getElementById("btn1")).style.display="block";
     
    }
    if(value=="England"){
      (document.getElementById("englandCheckBox")).style.display="block";
      (document.getElementById("franceCheckBox")).style.display="none";
      (document.getElementById("germanyCheckBox")).style.display="none";
      (document.getElementById("italyCheckBox")).style.display="none";
      (document.getElementById("spainCheckBox")).style.display="none";
      (document.getElementById("btn1")).style.display="block";
     }
     if(value=="France"){
      (document.getElementById("englandCheckBox")).style.display="none";
      (document.getElementById("franceCheckBox")).style.display="block";
      (document.getElementById("germanyCheckBox")).style.display="none";
      (document.getElementById("italyCheckBox")).style.display="none";
      (document.getElementById("spainCheckBox")).style.display="none";
      (document.getElementById("btn1")).style.display="block";
     }
     if(value=="germany"){
      (document.getElementById("englandCheckBox")).style.display="none";
      (document.getElementById("franceCheckBox")).style.display="none";
      (document.getElementById("germanyCheckBox")).style.display="block";
      (document.getElementById("italyCheckBox")).style.display="none";
      (document.getElementById("spainCheckBox")).style.display="none";
      (document.getElementById("btn1")).style.display="block";
     }
     if(value=="italy"){
      (document.getElementById("englandCheckBox")).style.display="none";
      (document.getElementById("franceCheckBox")).style.display="none";
      (document.getElementById("germanyCheckBox")).style.display="none";
      (document.getElementById("italyCheckBox")).style.display="block";
      (document.getElementById("spainCheckBox")).style.display="none";
      (document.getElementById("btn1")).style.display="block";
     }
     if(value=="all"){
      (document.getElementById("englandCheckBox")).style.display="block";
      (document.getElementById("franceCheckBox")).style.display="block";
      (document.getElementById("germanyCheckBox")).style.display="block";
      (document.getElementById("italyCheckBox")).style.display="block";
      (document.getElementById("spainCheckBox")).style.display="block";
      (document.getElementById("btn1")).style.display="block";
     }
 }

 teamsFilter(){
  
  this.filterShirts=[];
   for(let key in this.filterteams){
     if(this.filterteams[key] == true){
      console.log(key);
      this.teamsFilter2(key);
      
     } 
     
   }
 
 }

 teamsFilter2(value){
   
for(let i = 0 ; i<this.shirts.length; i++){
if(this.shirts[i].team==value) this.filterShirts.push(this.shirts[i]);
}
 }

 
 
  ngOnInit(): void {
    
    this.usersApi.getAll().subscribe(users => this.users = users);
    this.ordersApi.getAll().subscribe(orders => this.orders = orders);
    this.shirtsApi.getAll().subscribe(shirts => this.shirts = shirts);
   
    
    this.shirtsApi.getAll().subscribe(shirts => this.filterShirts = shirts);

    //this.TempCart =this.myUser.shoppingCart;
  }

}
