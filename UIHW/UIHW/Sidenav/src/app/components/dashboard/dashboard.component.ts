import { Component, ElementRef, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ModelAccessories, NavigationItem } from '../Models/Models';
import { NavigationService } from 'src/app/services/navigation.service';
import { UtilityServiceService } from 'src/app/services/utility-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  @ViewChild('modalTitle') modalTitle !: ElementRef;
  @ViewChild('container', {read: ViewContainerRef, static:true})
  container !: ViewContainerRef;
 cartItems: number =0;
navigationlist : NavigationItem[]=[];

constructor( private navigationService : NavigationService , public utilityService: UtilityServiceService){}
ngOnInit(): void {
  this.navigationService
  .getCategoryList()
  .subscribe((list : ModelAccessories[]) => {
    for(let item of list)
    {
      let present =false;
      for(let navItem of this.navigationlist) {
        if(navItem.category===item.category){
          navItem.subcategory.push(item.subCategory);
          present = true;
        }
      }
      if(!present){
        this.navigationlist.push({
          category: item.category,
          subcategory:[item.subCategory],
        });
      }

    }
  }); 
  this.utilityService.changeCart.subscribe((res:any) =>{
    this.cartItems +=parseInt(res);
  });
}

}
