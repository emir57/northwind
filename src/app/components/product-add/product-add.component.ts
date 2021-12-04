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
        .subscribe(response => {
          if(response.success){
            this.toastr.success("Ürün başarıyla eklendi","Başarılı");
          }else{
            console.log("a")
            this.toastr.error(response.message)
          }
        },responseErr=>{
          if(responseErr.error.Message!==null){
            this.toastr.warning(responseErr.error.Message)
          }
          if(responseErr.error.Errors){
            for (let i = 0; i < responseErr.error.Errors.length; i++) {
              this.toastr.error(responseErr.error.Errors[i].ErrorMessage,"Doğrulama Hatası");
            }
          }
        })
    }else{
      this.toastr.error("Formunuz eksik","Hata");
    }

  }

}
