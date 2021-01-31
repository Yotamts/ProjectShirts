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
  orders:Order[]=[];

  

 selectLeague(value){
   
     
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
  }

}
