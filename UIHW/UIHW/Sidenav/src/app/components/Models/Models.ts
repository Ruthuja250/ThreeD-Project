
export interface SuggestedProduct {
    banerimage : string;
     category : ModelAccessories;
     
 }
 
 export interface NavigationItem {
     category : string;
      subcategory :string[];
      
  }
 
  export interface ModelAccessories {
     id : number;
     category : string;
     subCategory: string;
 }
  
 
 export interface Model {
     
     id: number;
     title:string;
     description: string;
     modelAccesoriess: ModelAccessories;
     price: number;
     quantity: number;
     imageName: string;
 }