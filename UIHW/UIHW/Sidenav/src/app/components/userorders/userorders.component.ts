import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-userorders',
  templateUrl: './userorders.component.html',
  styleUrls: ['./userorders.component.css']
})
export class UserordersComponent {
  OrderId:any;
  CustomerId:any;
  ProductId:any;
  public orders!:any[];
  order:any={
    ProductName:'',
    Quantity:'',
    price:'',
    OrderStatus:'',
    CustomerName:'',
    OrderDate:'',
    TotalAmount:'',
   }
   update:any={
    ProductName:'',
    Quantity:'',
    price:'',
    OrderStatus:'Accepted',
    CustomerName:'',
    OrderDate:'',
    TotalAmount:'',
    
   }
   
  /**
   *
   */
  constructor(
    private router:Router ) { }
  ngOnInit(): void {
     
    this.refreshList();
  }
  
 
  refreshList(){
    this.order.getOrders().subscribe((data: any[])=>{
      this.orders=data;
      console.log(this.orders)
    });

}
 Accept(OrderId:number){
  this.order.getorderbyId(OrderId). subscribe((data: any)=>{
    this.order=data;
    this.update.ProductName=this.order.ProductName;
      this.update.Quantity=this.order.Quantity;
      this.update.Price=this.order.Price;
      this.update.OrderStatus=this.update.OrderStatus
      this.update.CustomerName=this.order.CustomerName;
      this.update.OrderDate=this.order.OrderDate;
      this.update.TotalAmount=this.order.TotalAmount;
     
    this.order.updateorder(OrderId,this.update).subscribe
    (
      (      data: any)=>{
        this.ngOnInit();
      },(error: any)=>console.log(error));
     
    
  },(error: any)=>console.log(error));
    

 }
 

 onLogout() {
  localStorage.clear();
  this.router.navigate(['/home']);
 }
}

