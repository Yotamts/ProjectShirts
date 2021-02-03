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

  changeTempSirt(shirt:Shirt){
    this.tempshirt=shirt;
    this.tepmBool=shirt.in_stock;
  }
priceSort(v){
  if(v=="lowPrice") this.filterShirts.sort(function(a, b){return a.price - b.price});
  if(v=="highPrice") this.filterShirts.sort(function(a, b){return b.price - a.price});
  
}

 selectLeague(value){
  this.filterShirts=this.shirts.filter(a=>a.league==value);
   if(value=="spain"){
     (document.getElementById("englandCheckBox")).style.display="none";
     (document.getElementById("franceCheckBox")).style.display="none";
     (document.getElementById("germanyCheckBox")).style.display="none";
     (document.getElementById("italyCheckBox")).style.display="none";
     (document.getElementById("spainCheckBox")).style.display="block";
     (document.getElementById("btn1")).style.display="block";
     
    }
    if(value=="england"){
      (document.getElementById("englandCheckBox")).style.display="block";
      (document.getElementById("franceCheckBox")).style.display="none";
      (document.getElementById("germanyCheckBox")).style.display="none";
      (document.getElementById("italyCheckBox")).style.display="none";
      (document.getElementById("spainCheckBox")).style.display="none";
      (document.getElementById("btn1")).style.display="block";
     }
     if(value=="france"){
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

  constructor(private usersApi:UsersService,private ordersApi:OrdersService, private shirtsApi:ShirtsService) { }
 
  ngOnInit(): void {



    this.usersApi.getAll().subscribe(users => this.users = users);
    this.ordersApi.getAll().subscribe(orders => this.orders = orders);
    this.shirtsApi.getAll().subscribe(shirts => this.shirts = shirts);
    this.shirtsApi.getAll().subscribe(shirts => this.filterShirts = shirts);
  }

}
