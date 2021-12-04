import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      Email:['',Validators.required],
      Password:['',Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({},this.loginForm.value);
      this.authService.login(loginModel)
        .subscribe(response=>{
          if(response.success){
            this.toastrService.success("Giriş Başarılı");
            localStorage.setItem("token",response.data.token);
            this.toastrService.info("Token Oluşturuldu");
          }
        },responseError=>{
          this.toastrService.error(responseError.error)
        })
    }else{

    }
  }


  getDate(){
    let today = new Date()
    return today.getFullYear();
  }

}
