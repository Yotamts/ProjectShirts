import { Component, OnInit, Input, Output } from '@angular/core';
import { Shirt } from '../shirt';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor() { }
  @Input() shirt:Shirt;

  
  
  ngOnInit(): void {

  }

}
