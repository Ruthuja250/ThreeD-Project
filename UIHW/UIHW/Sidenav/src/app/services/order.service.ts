import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Order } from '../models/order';

@Injectable({

  providedIn: 'root'
})




export class OrderService {

constructor(private http:HttpClient,) { }

CreateOrders(orderModel:Order){

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }

return this.http.post("https://localhost:7250/api/Orders",orderModel,httpOptions);

}


GetAllOrders(): Observable<Order[]> {

    return this.http.get<Order[]>('https://localhost:7250/api/Orders');

  }

GetOrderById(id : number| null): Observable<Order[]> {

    return this.http.get<Order[]>('https://localhost:7250/api/Orders'+id);

}

DeleteOrder(id: number){

  return this.http.delete('https://localhost:7250/api/Orders/'+ id);

}


}