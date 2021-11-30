import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',

  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  dataLoaded = false;
  searchString:string;

  constructor(
    private productService: ProductService,
    private activatedRoute:ActivatedRoute,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["categoryId"]){
        this.getProductsByCategory
              (params["categoryId"]);
      }
      else{
        this.getProducts();
      }
    })
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe(data => {
        this.products = data.data
        this.dataLoaded=true
      })
  }
  getProductsByCategory(categoryId:number){
    this.productService.getProductsByCategory(categoryId)
      .subscribe(data=>{
        this.products=data.data
        this.dataLoaded=true;
      })
  }



}
