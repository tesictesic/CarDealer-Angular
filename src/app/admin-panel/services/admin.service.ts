import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  params=new HttpParams();
  $table=new BehaviorSubject<string>('');
  $id=new BehaviorSubject<number>(0);
  $openDeleteModal=new BehaviorSubject<boolean>(false);
  $openInsert=new BehaviorSubject<boolean>(false);
  $openUpdate=new BehaviorSubject<boolean>(false);
  $insertTriger=new BehaviorSubject<boolean>(false);
  constructor(
    private http:HttpClient
  ) { }

  getData(page:number|null=null):Observable<any>{
    
    if(page!=null){
      this.params=new HttpParams();
      this.params=this.params.set('page',page)
    }
    return this.http.get('http://127.0.0.1:8000/api/'+this.$table.getValue(),{params:this.params})
  }
  getDataforForm():Observable<any>{
    console.log('http://127.0.0.1:8000/api/'+this.$table.getValue()+"/create");
    return this.http.get('http://127.0.0.1:8000/api/create'+this.$table.getValue());
  }
  insertTable(obj:FormData|any):Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/'+this.$table.getValue(),obj);
  }
  deleteTable(id:number):Observable<any>{
    return this.http.delete('http://127.0.0.1:8000/api/'+this.$table.getValue()+"/"+id);  
  }
  updateTable(id:number,obj:FormData|any):Observable<any>{
    if(this.$table.getValue()==='users' || this.$table.getValue()=='vehicles'){
      return this.http.post('http://127.0.0.1:8000/api/update'+this.$table.getValue()+"/"+id,obj);
    }
    return this.http.put('http://127.0.0.1:8000/api/'+this.$table.getValue()+"/"+id,obj);
  }
  getDataObj(id:number):Observable<any>{
    
    return this.http.get('http://127.0.0.1:8000/api/update'+this.$table.getValue()+"/"+id)
  }
}
