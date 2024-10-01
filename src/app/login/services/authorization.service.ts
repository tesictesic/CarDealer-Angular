import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICredentials } from '../interfaces/i-credentials';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  urlLogin:string="http://127.0.0.1:8000/api/login";
  user:string|null=null;
  constructor(
    private http:HttpClient,
    private router:Router
  ) { }
  login(obj:ICredentials):Observable<any>{
      return this.http.post(this.urlLogin,obj);
  }
  logout():void{
    localStorage.removeItem('user');
    this.router.navigateByUrl("/home");
  }
  isLogged():boolean{
    return !!localStorage.getItem('user');
  }
  getDataFromLoggedUser(){
    this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
    return this.user;
  }
}
