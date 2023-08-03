import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityServiceService {
  changeCart = new Subject();
  constructor() { }

  addToCart(){
    this.changeCart.next(1);
  }
}
