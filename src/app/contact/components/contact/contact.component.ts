import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IContact } from '../../interfaces/i-contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent  {
  succesMsg:string='';
  errorMsg:string='';
  form:any=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.pattern(/^([A-ZŠĐŽĆČ][a-zšđžćč]{2,15})\s([A-ZŠĐŽĆČ][a-zšđžćč]{2,15}){0,2}$/)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    subject:new FormControl('',[Validators.required]),
    message:new FormControl('',[Validators.required,Validators.minLength(5)])
  });
  constructor(
    private contactService:ContactService
  ){}
 
  sendContactMessage():void{
    let objSend:IContact=this.form.value;
    console.log
    this.contactService.sendMessage(objSend).subscribe({
      next:(resp)=>{
        console.log(resp);
        this.succesMsg=resp.success
        this.form.reset({
          name:'',
          email:'',
          subject:'',
          message:''
        })
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
