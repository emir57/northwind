import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { ListResponseModel } from '../models/ListResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = "https://localhost:44367/api/categories";
  constructor(
    private http:HttpClient
  ) { }

  getCategories():Observable<ListResponseModel<Category>>{
    return this.http.get<ListResponseModel<Category>>(`${this.apiUrl}/getall`)
  }
}
