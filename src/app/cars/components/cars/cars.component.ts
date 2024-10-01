import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../../services/car.service';
import { ICar } from '../../interfaces/i-car';
import { IBrand } from '../../interfaces/i-brand';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent implements OnInit {
    
    @ViewChild('previous') previous!:ElementRef
    @ViewChild('next') next!:ElementRef
    @ViewChild('model') model!:ElementRef;
    cars:ICar[]=[];
    currentPage:number=-1;
    lastPage:number=-1;
    paginationArr:number[]=[];
    brands:IBrand[]=[];
    models:IBrand[]|null=null;
    fuel:IBrand[]=[];
    typeOfCars:IBrand[]=[];
    obj_filters={
      brandId:'',
      modelId:'',
      fuelId:'',
      body_typeId:'',
      price_from:'',
      price_to:'',
      sorting:''
    };
     filteredParams:any={}
    

  constructor(
    private router:Router,
    private carService:CarService
  ){}
  ngOnInit(): void {
    this.carService.getAllCars().subscribe({
      next:(data)=>{
        this.cars=data.cars.data;
        this.brands=data.brands
        this.fuel=data.fuel;
        this.typeOfCars=data.type_of_cars
        this.currentPage=data.cars.current_page;
        this.lastPage=data.cars.last_page;
        this.LoadPagination()
      },
      error:(error)=>{
        console.log(error);
      }
    })
    
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.model.nativeElement.disabled=true;
  }
  ViewMore(carId:number){
    this.router.navigate(['/cars',carId]);
    
  }
  LoadPagination(){
    if((this.currentPage)<=1) this.previous.nativeElement.hidden=true;
    else this.previous.nativeElement.hidden=false;
    if((this.currentPage)>=(this.lastPage)) this.next.nativeElement.hidden=true;
    else this.next.nativeElement.hidden=false;
    this.paginationArr.length=0;
    for(let i=1;i<=this.lastPage;i++){
      this.paginationArr.push(i);
    }
    console.log(this.paginationArr);
  }
  moveNext(){
    this.currentPage++
    this.CarsWithParameters(this.filteredParams);
    console.log(this.model);
  }
  movePrevious(){
    this.currentPage--;
    this.CarsWithParameters(this.filteredParams);
  }
  changePage(page:number){
    this.currentPage=page;
    this.CarsWithParameters();
  }
  CarsWithParameters(obj:any|null=null){
    this.carService.getCarsWithParameteres(this.currentPage,obj).subscribe({
      next:(data)=>{
        console.log(data);
        this.cars=data.cars.data;
        this.brands=data.brands
        this.fuel=data.fuel;
        this.typeOfCars=data.type_of_cars
        this.currentPage=data.cars.current_page;
        this.lastPage=data.cars.last_page;
       
        this.LoadPagination()
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
  getModels(brandId:any){
    var brandIdParsed=Number(brandId);
    this.obj_filters.brandId=brandId
    if(brandIdParsed==0){
      this.model.nativeElement.disabled=true;
      this.models=null;
    } 
    else{
      this.carService.getModels(brandIdParsed).subscribe({
        next:(data)=>{
           console.log(data);
           this.models=data.items
           this.model.nativeElement.disabled=false;
        },
        error:(err)=>console.log(err)
      })
    }
  }
  applyFilters(){
    console.log(this.obj_filters);
    this.filteredParams={};
    // Koristi keyof da bi TypeScript znao da pristupaš ključevima objekta
    Object.keys(this.obj_filters).forEach(key => {
      if (this.obj_filters[key as keyof typeof this.obj_filters] !== '' && this.obj_filters[key as keyof typeof this.obj_filters] !== '0') {
        this.filteredParams[key] = this.obj_filters[key as keyof typeof this.obj_filters];
      }
    });
    console.log(this.filteredParams);
    this.currentPage=1;
    this.CarsWithParameters(this.filteredParams);
  } 
}
