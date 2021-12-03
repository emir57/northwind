import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
  providers: []
})
export class ProductAddComponent implements OnInit {

  productAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.createProductAddForm();
  }
  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      productName: ['', Validators.required],
      unitPrice: ['', Validators.required],
      unitsInStock: ['', Validators.required],
      categoryId: ['', Validators.required]
    })

  }
  add() {
    if (this.productAddForm.valid) {
      let productModel = Object.assign({}, this.productAddForm.value)
      this.productService.add(productModel)
        .subscribe(data => {
          this.toastr.success("Ürün başarıyla eklendi","Başarılı");
        },err=>{
          if(err.error.Errors.length>0){
            for (let i = 0; i < err.error.Errors.length; i++) {
              this.toastr.error(err.error.Errors[i].ErrorMessage,"Doğrulama Hatası");
            }
          }
        })
    }else{
      this.toastr.error("Formunuz eksik","Hata");
    }

  }

}
