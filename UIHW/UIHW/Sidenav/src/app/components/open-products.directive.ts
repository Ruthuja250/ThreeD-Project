import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModelAccessories } from './Models/Models';

@Directive({
  selector: '[appOpenProducts]'
})
export class OpenProductsDirective {
  @Input() category : ModelAccessories={
    id:0,
    category:'',
    subCategory:'',
  };
  @HostListener('click') openProducts(){
    this.router.navigate(['Products'],{
      queryParams: {
        category: this.category.category,
        subcategory:this.category.subCategory,
      },
    });
  }
  constructor(private router: Router) { }

}
