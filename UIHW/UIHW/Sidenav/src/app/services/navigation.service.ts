import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import {  ModelAccessories } from '../components/Models/Models';


@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  baseUrl = "https://localhost:7142/api/";

  constructor(private http: HttpClient) { }

  getCategoryList() {
    let url = this.baseUrl + 'ModelAccessories/GetCategoryList';
    return this.http.get<any[]>(url).pipe(
      map((categories) =>
        categories.map((category) => {
          let mappedCategory: ModelAccessories = {
            id: category.id,
            category: category.category,
            subCategory: category.subCategory,
          };
          return mappedCategory;
        }))
    );
  }

  getProducts(category: string, subcategory: string, count: number) {
    return this.http.get<any[]>(this.baseUrl + 'Model/GetProducts', {
      params: new HttpParams()
        .set('category', category)
        .set('subcategory', subcategory)
        .set('count', count),
    });
  }

  getproduct(id: number) {
    let url = this.baseUrl + 'Model/GetProduct/' + id;
    return this.http.get(url);
  }

}
