import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',

  styleUrls: ['./product.component.css'],
  providers:[ToastrService]
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  dataLoaded = false;
  searchString:string;

  constructor(
    private productService: ProductService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
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

  addToCart(product:Product){
    this.toastrService.success(product.productName)
    console.log(product)
  }



}
