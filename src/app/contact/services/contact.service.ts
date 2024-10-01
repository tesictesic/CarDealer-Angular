import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IContact } from '../interfaces/i-contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
   urlToSendMessage="http://127.0.0.1:8000/api/contact"
  
  constructor(
    private http:HttpClient
  ) { }
  sendMessage(obj:IContact):Observable<any>{
     return this.http.post(this.urlToSendMessage,obj)
  }


}
