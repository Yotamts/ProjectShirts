import { Component, OnInit, ViewChild} from '@angular/core';
import { Shirt } from '../shirt';
import { ShirtsService } from '../shirts.service';
import { User } from '../user';
import { UsersService } from '../users.service';


import { FilePond, FilePondFile, FilePondOptions } from 'filepond';
import { FilePondComponent } from 'ngx-filepond/filepond.component';
import { Order } from '../order';
import { OrdersService } from '../orders.service';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  @ViewChild('myPond') myPond: FilePondComponent

  pondOptions: FilePondOptions = {
    allowMultiple: true,
    labelIdle: 'Drop files here...',
    // fake server to simulate loading a 'local' server file and processing a file
    server: {
      process: (fieldName, file, metadata, load) => {
        // simulates uploading a file
        setTimeout(() => {
          load(Date.now().toString)
        }, 1500);
      },
      load: (source, load) => {
        // simulates loading a file from the server
        fetch(source).then(res => res.blob()).then(load);
      }
    }
  }

  

  pondHandleInit() {
    console.log('FilePond has initialised', this.myPond);
  }

  pondHandleAddFile(event: any) {
    console.log('A file was added', event);
    
  }

  pondHandleActivateFile(event: any) {
    console.log('A file was activated', event)
  }
   

  


  constructor( private UsersService2:UsersService, private shirtsApi:ShirtsService, private orderApi:OrdersService) { }
  
 
tempStock:boolean=true;
  tempUsers:User[]=[];
  tempUsers2:User[]=[];
  tempuser:User;
  shirts:Shirt[]=[];
  tempShirts:Shirt[]=[];
  outOfStock:number;
  flag:number;
  orders:Order[]=[];
  tempOrders:Order[]=[];
 
  newShirt(id,league,team,title, stock, price){
    let tempshirt:Shirt={id:id,title:title,league:league, team:team, price:price, goalkeeper:false,img:"assets/img/shirts/italy/milan_away_20.jpg",in_stock:false,size:null,num:null,stock:stock,name:null,long_sleeves:false,quantity:null};
   
    if(stock>0)tempshirt.in_stock=true;
   this.shirtsApi.add(tempshirt).subscribe(res => {
     
     alert("חולצה נוספה בהצלחה");
     this.shirtsApi.getAll().subscribe(shirts =>{ this.shirts = shirts;
      console.log(this.shirts);});
     document.getElementById('light').style.display='none';document.getElementById('fade').style.display='none';

    
   }, rej =>{   alert("חולצה נוספה בהצלחה");
   this.shirtsApi.getAll().subscribe(shirts =>{ this.shirts = shirts;
    console.log(this.shirts);});
   document.getElementById('light').style.display='none';document.getElementById('fade').style.display='none';});
  }

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
  showOrderDet(i){
    if( document.getElementById(`order${i}`).style.display=="none")
   document.getElementById(`order${i}`).style.display="table-row";
   else  document.getElementById(`order${i}`).style.display="none";
  }
  showProDet(i){
    if( document.getElementById(`shirt${i}`).style.display=="none")
   document.getElementById(`shirt${i}`).style.display="table-row";
   else  document.getElementById(`shirt${i}`).style.display="none";
  }
  unshowUserDet(i){
    document.getElementById(`user${i}`).style.display="none";
   }
   unshowOrderDet(i){
    document.getElementById(`order${i}`).style.display="none";
   }
   unshowShirtDet(i){
    document.getElementById(`shirt${i}`).style.display="none";
   }
 
   updateShirt(i,league,team,title, stock,  price){
     let shirt1:Shirt=this.shirts[i];
     shirt1.league=league;
     shirt1.team=team;
     shirt1.title=title;
     shirt1.stock=stock;
     shirt1.price=price;
     if(stock>0)shirt1.in_stock=true;
    this.shirtsApi.update(shirt1).subscribe(res => {
      console.log("shirt added");

     
     
    });
   }
   imgUpdate(v){
    console.log(v);
   }
   addToStock(i,v){
     let y = Number(this.shirts[i].stock);
     let x = Number(v);
     let t = x+y;
     this.shirts[i].stock =t;
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

  findOrder(v){
   this.orderApi.getAll().subscribe(orders =>{
     this.tempOrders = orders;
     this.orders =this.tempOrders.filter(element => element.customer_name.includes(v) || element.address.includes(v) || element.date.includes(v) || element.status.includes(v)|| element.area.includes(v) || element.remarks.includes(v));
   } );}

  findshirt(v){
    
   this.shirtsApi.getAll().subscribe(shirts =>{
     this.tempShirts = shirts;
     this.shirts =this.tempShirts.filter(element => element.league.includes(v) || element.team.includes(v) || element.title.includes(v) );
   } );
   
  
 }

  stockChange(i){
    let shirt1:Shirt=this.shirts[i];
    this.shirtsApi.update(shirt1).subscribe(res => {
      console.log("shirt updated");
     
     
    });

  }
  
  delShirt(i){
    let id:number=this.shirts[i].id;
    this.shirtsApi.delete(id).subscribe(res => {
      console.log("shirt deleted");
      alert("מוצר נמחק");
      this.shirtsApi.getAll().subscribe(shirts =>{ this.shirts = shirts;
        console.log(this.shirts);});
      

    });
  }
    
  showProducts(){
    this.shirtsApi.getAll().subscribe(shirts =>{ this.shirts = shirts;
      this.outOfStock=shirts.filter(a=>a.in_stock==false).length;
    document.getElementById("productsDiv").style.display="unset";
    document.getElementById("ordersDiv").style.display="none";
    document.getElementById("usersDiv").style.display="none";
    document.getElementById("usersBTN").style.backgroundColor="transparent";
    document.getElementById("ordersBTN").style.backgroundColor="transparent";
    document.getElementById("productsBTN").style.backgroundColor="rgb(159 180 244)";})
  }
  outOf(){
    this.tempShirts = this.shirts;
     this.shirts =this.tempShirts.filter(element => element.in_stock==false );
  }
  flags(){
    
     this.orders =this.orders.filter(element => element.flag==true );
  }
  showOrders(){
    this.orderApi.getAll().subscribe(orders =>{ this.orders = orders;
      this.flag=orders.filter(a=>a.flag==true).length;
    document.getElementById("productsDiv").style.display="none";
    document.getElementById("ordersDiv").style.display="unset";
    document.getElementById("usersDiv").style.display="none";
    document.getElementById("usersBTN").style.backgroundColor="transparent";
    document.getElementById("ordersBTN").style.backgroundColor="rgb(159 180 244)";
    document.getElementById("productsBTN").style.backgroundColor="transparent";});
    
  }
   
  stockBool(v){
    console.log(v);
  }

  ngOnInit(): void {
  }

}
