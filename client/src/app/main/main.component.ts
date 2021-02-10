import { literal } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
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
  users:User[]=[];
  shirts:Shirt[]=[];
  filterShirts:Shirt[]=[];
  orders:Order[]=[];

  tempshirt:Shirt={id:1,title:"temp",league:"temp", team:"tepm", price:0, goalkeeper:false,img:"assets/img/shirts/italy/milan_away_20.jpg",in_stock:true,size:"m",num:10,stock:20,name:"tepm",long_sleeves:false,quantity:2};
  tepmBool=true;
  filterteams={Arsenal:false,ManchesterUnited:false,manchesterCity:false,liverpool:false,lyon:false,marseille:false,psg:false,bayern:false,dortmund:false,juventus:false,millan:false,roma:false,atletico:false,barcelona:false,real:false}
  changeTempSirt(shirt:Shirt){
    this.tempshirt=shirt;
    this.tepmBool=shirt.in_stock;
  }
priceSort(v){
  if(v=="lowPrice") this.filterShirts.sort(function(a, b){return a.price - b.price});
  if(v=="highPrice") this.filterShirts.sort(function(a, b){return b.price - a.price});
  
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

 
  constructor(private usersApi:UsersService,private ordersApi:OrdersService, private shirtsApi:ShirtsService) { }
 
  ngOnInit(): void {
    
   

    

    this.usersApi.getAll().subscribe(users => this.users = users);
    this.ordersApi.getAll().subscribe(orders => this.orders = orders);
    this.shirtsApi.getAll().subscribe(shirts => this.shirts = shirts);
    this.shirtsApi.getAll().subscribe(shirts => this.filterShirts = shirts);
  }

}
