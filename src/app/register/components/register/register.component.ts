import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRegister } from '../../interfaces/i-register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  picture:File|null=null;
  errorMsg:string|null=null;
  successMsg:string|null=null
  form:any=new FormGroup({
    firstName:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z]{3,}$/)]),
    lastName:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z]{3,}$/)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    picture:new FormControl('',Validators.pattern(/\.(jpg|jpeg|png)$/i)),
    termsConditions:new FormControl(false,[Validators.requiredTrue])
    
  })
   constructor(
    private registerService:RegisterService,
    private router:Router
   ){}
   triggerFileInput() {
    this.fileInput.nativeElement.click();
  }
   uploadPicture(event:any){
    const file=event.target.files[0];
    if(file!=undefined){
      console.log(file);
    this.picture=file
    }
   }

   register(){
    let obj_register: FormData = new FormData();
    obj_register.append('first_name', this.form.value.firstName);
    obj_register.append('last_name', this.form.value.lastName);
    obj_register.append('email', this.form.value.email);
    obj_register.append('password', this.form.value.password);
    if(this.picture!=null) obj_register.append('picture',this.picture);
    this.registerService.register(obj_register).subscribe({
      next:(resp)=>{
        console.log(resp)
        this.successMsg=resp.message;
        this.errorMsg=null
        this.clearForm();
        setTimeout(()=>{
          this.router.navigateByUrl("/login");
        },5000)
      },
      error:(err)=>{
        console.log(err);
        this.errorMsg=err.error.message
        this.successMsg=null;
        this.clearForm();
      }
    })
   }
   clearForm():void{
    this.form.reset({
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      picture:'',
      termsConditions:false
    });
    this.picture=null
   }

}
