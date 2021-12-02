import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/ListResponseModel';
import { Product } from '../models/product';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = "https://localhost:44367/api/products";
  constructor(
    private http:HttpClient
  ) { }

  getProducts():Observable<ListResponseModel<Product>>{
    let newPath = `${this.apiUrl}/getall`;
    return this.http.get<ListResponseModel<Product>>(newPath)
  }
  getProductsByCategory(categoryId:number):Observable<ListResponseModel<Product>>{
    let newPath = `${this.apiUrl}/getbycategory?categoryId=${categoryId}`;
    return this.http.get<ListResponseModel<Product>>(newPath)
  }

  add(product:Product){
    let newPath = `${this.apiUrl}/add`;
    return this.http.post<ResponseModel>(newPath,product);
  }

}
