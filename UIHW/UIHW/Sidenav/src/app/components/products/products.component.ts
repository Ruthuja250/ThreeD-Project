import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service'
import { Model } from '../Models/Models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  view:'grid' | 'list'='list';
  sortby: 'default' | 'htl' | 'lth' ='default';
  products: Model[]=[];
constructor(
  private activatedRoute : ActivatedRoute,
  private navigationService : NavigationService,
){}
ngOnInit(): void {
  this.activatedRoute.queryParams.subscribe((params : any)=>{
    let category = params.category;
    let subcategory = params.subcategory

    if(category && subcategory)
    this.navigationService.getProducts(category,subcategory,10)
    .subscribe((res : any) =>
    {
      this.products = res;
    });
  });

}
sortByPrice(sortkey: string)
{
  this.products.sort((a, b) => {
    if(sortkey === 'default'){

      return a.id > b.id ? 1 : -1;

    }
    if(sortkey === 'htl'){
      
      return a.price > b.price ? -1 : 1;
    }
    if(sortkey === 'lth' ? 1 :-1){
      return  a.price > b.price ? 1 : -1;
    }
    
    return 0;
  });
}
}
