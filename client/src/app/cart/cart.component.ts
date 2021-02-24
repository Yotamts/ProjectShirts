import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Shirt } from '../shirt';
import { ShirtsService } from '../shirts.service';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private usersApi:UsersService, private shirtsApi:ShirtsService, private router:Router) { }

  myUser:User;
  num:number=1;
  price:number=0; 
  shirts:Shirt[]=[];
  
  counter(){
    this.num++;
  }

  priceFromNav(price){
    this.price=price;
      }

  userFromNav(user:User){
    this.myUser=user;
      }

      del(i){
        this.shirtsApi.getAll().subscribe(shirts =>{ this.shirts = shirts;
          console.log(this.shirts);
          let shirt1:Shirt = this.shirts.find(element => element.title == this.myUser.shoppingCart[i].title);
        let drop=this.myUser.shoppingCart.splice(i, 1);
        this.usersApi.update(this.myUser).subscribe(res => {
          console.log("user updated");
        });

        
        shirt1.stock++;
        if(shirt1.stock>0) shirt1.in_stock=true;
        this.shirtsApi.update(shirt1).subscribe(res => {
         console.log("shirt added");
        
       });
        });

       

      }
      goToPay(){
        this.router.navigate(['pay']);
      }
  ngOnInit(): void {
    
  }
  

}
