import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  constructor(private usersApi:UsersService) { }
  textClass:string = 'steps';
  price=0;
  myUser:User;

  priceFromNav(price){
    this.price=price;
      }

  userFromNav(user:User){
    this.myUser=user;
      }

      nextStep(){
        this.textClass='steps2';
        document.getElementById("step1").style.display="none";
        document.getElementById("step2").style.display="unset";
        this.usersApi.update(this.myUser).subscribe(res => {
          console.log("user updated");
        });
      }
      backStep(){
        this.textClass='steps';
        document.getElementById("step2").style.display="none";
        document.getElementById("step1").style.display="unset";
      }
  
  ngOnInit(): void {
    
  }

}
