import { Component, Input, OnInit } from '@angular/core';
import {  Model, ModelAccessories  } from '../Models/Models';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-suggested-product',
  templateUrl: './suggested-product.component.html',
  styleUrls: ['./suggested-product.component.css']
})
export class SuggestedProductComponent implements OnInit {
  @Input() category : ModelAccessories = {
    id: 0,
    category: '',
    subCategory: '',
  };
  @Input() count: number = 3;
   products: Model[]=[];

  constructor( private navigationService : NavigationService) {}

  ngOnInit(): void {
    this.navigationService
    .getProducts(
      this.category.category,
      this.category.subCategory,
      this.count
    )
    .subscribe((res:any[]) =>{
      for(let product of res)
      {
        this.products.push(product);
      }
    });  
  }

}
