import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  params=new HttpParams();
  urlGetCars:string="http://127.0.0.1:8000/api/cars";
  urlGetModels:string="http://127.0.0.1:8000/api/getModel/"
  urlGetCar:string="http://127.0.0.1:8000/api/car/"

  constructor(
    private http:HttpClient
  ) { }

  getAllCars():Observable<any>{
    return this.http.get(this.urlGetCars);
  }
  getCarsWithParameteres(page:number|null=null,obj:any|null=null):Observable<any>{
    this.params=new HttpParams();
   
    if(obj!=null){
      if(Object.keys(obj).length>0) this.params=this.params.appendAll(obj);
      else this.params=new HttpParams();
      
    }
    if(page!=null){
      this.params=this.params.set('page',page)
    }
    

    
    return this.http.get(this.urlGetCars,{params:this.params})
  }
  getModels(brandId:number):Observable<any>{
    return this.http.get(this.urlGetModels+brandId)
  }
  getSingleCar(carId:number):Observable<any>{
    return this.http.get(this.urlGetCar+carId);
  }
}
