import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
@Directive({
  selector: '[appOpenProductDetails]'
})
export class OpenProductDetailsDirective {
  @Input() productId: number = 0;
  @HostListener('click') openProductsDetails(){
    window.scrollTo(0,0);
    this.router.navigate(['Product-Details'],{
      queryParams: {
        id:this.productId,
      },
    });
  }
  constructor(private router: Router) { }

}
