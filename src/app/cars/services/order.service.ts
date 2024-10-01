import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from '../interfaces/i-order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  urlToOrderCar="http://127.0.0.1:8000/api/order"
  constructor(
    private http:HttpClient
  ) { }

  orderCar(obj:IOrder):Observable<any>{
    return this.http.post(this.urlToOrderCar,obj);
  }
  changeOrderStatus():Observable<any>{
    return this.http.patch(this.urlToOrderCar,{});
  }
}
