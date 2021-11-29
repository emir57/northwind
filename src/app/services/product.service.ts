import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/ListResponseModel';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = "https://localhost:44367/api/products";
  constructor(
    private http:HttpClient
  ) { }

  getProducts():Observable<ListResponseModel<Product>>{
    return this.http.get<ListResponseModel<Product>>(`${this.apiUrl}/getall`)
  }

}
