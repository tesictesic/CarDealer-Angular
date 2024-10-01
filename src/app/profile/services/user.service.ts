import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   params=new HttpParams();
  urlGetUser:string="http://127.0.0.1:8000/api/user"
  constructor(
    private http:HttpClient
  ) { }
  getUser(page:number=1,userId:number):Observable<any>{
    this.params=this.params.set('userId',userId);
    this.params=this.params.set('page',page);
    return this.http.get(this.urlGetUser,{params:this.params});
  }
}
