import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ICredentials } from '../../interfaces/i-credentials';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  crendetials:ICredentials={
    email:'',
    password:''
   };
   errorMsg:string|null=null;
   form:any=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])
   })
  constructor(
    private router: Router,
    private authService:AuthorizationService
  ) {}
login():void{
  this.crendetials=this.form.value;
  this.authService.login(this.crendetials).subscribe({
    next:(resp)=>{
      this.errorMsg=null;
      localStorage.setItem('user',JSON.stringify(resp));
      this.resetForm();
      this.router.navigateByUrl('/')
      
    },
    error:(err)=>{
      this.errorMsg=err.error.message
      this.resetForm();
    }
  })
}
resetForm():void{
  this.form.reset({
    email:'',
    password:''
  })
}
}
