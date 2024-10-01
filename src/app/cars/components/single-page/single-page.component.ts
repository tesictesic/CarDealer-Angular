import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CarService } from '../../services/car.service';
import { ActivatedRoute } from '@angular/router';
import { ICar } from '../../interfaces/i-car';
import { AuthorizationService } from '../../../login/services/authorization.service';
import { IProfile } from '../../../profile/interfaces/i-profile';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IOrder } from '../../interfaces/i-order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrl: './single-page.component.css'
})
export class SinglePageComponent implements OnInit {
    carItem:ICar|null=null;
    @ViewChild('order') order!:ElementRef
    user:IProfile|null=null;
    user_exist:string|null=null;
    order_form:any=new FormGroup({})
    car_name:string="";
    carId:string|null=''
    orderCheckout:IOrder|null=null
    isOrdered:boolean=false;
    orderMessage:string='';
    

  constructor(
    private carService:CarService,
    private authService:AuthorizationService,
    private activeRoute:ActivatedRoute,
    private orderService:OrderService
  ){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.carId=this.activeRoute.snapshot.paramMap.get('id');
    var carIdParsed=Number(this.carId);
    this.carService.getSingleCar(carIdParsed).subscribe({
      next:(data)=>{
        this.carItem=data.item;
        this.car_name=`${this.carItem?.brand || ''} ${this.carItem?.model || ''} ${this.carItem?.label || ''}`;
      },
      error:(err)=>{console.log(err);}
    })
    this.user_exist=this.authService.getDataFromLoggedUser();
    if(this.user_exist!=null){
      let splitedUser:any=this.user_exist as Object
      this.user=splitedUser;
      console.log(this.user);
    }
    this.fillInForm();
    
    
    
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log(this.order);
    this.order.nativeElement.hidden=true;
  }
  displayForm(event:Event):void{
    event.preventDefault();
    this.order.nativeElement.hidden=false;
    this.order.nativeElement.scrollIntoView({ behavior: 'smooth' })
    
  }
  
  fillInForm() {
    // Make sure car_name is populated from the API response
   
  
    // Add form controls, checking if they already exist
    if (!this.order_form.get('firstName')) {
      this.order_form.addControl('firstName', new FormControl({ value: this.user?.first_name || '', disabled: true }));
    }
    if (!this.order_form.get('lastName')) {
      this.order_form.addControl('lastName', new FormControl({ value: this.user?.last_name || '', disabled: true }));
    }
    if (!this.order_form.get('email')) {
      this.order_form.addControl('email', new FormControl({ value: this.user?.email || '', disabled: true }));
    }
    if (!this.order_form.get('location')) {
      this.order_form.addControl('location', new FormControl('', [Validators.required]));
    }
  }
  orderCar():void{
    console.log(this.order_form.value.location)
    let numberVehicleId=(Number)(this.carId);
    this.orderCheckout={
      vehicleId:numberVehicleId,
      userId:this.user?.id,
      location:this.order_form.value.location
    }
    this.orderService.orderCar(this.orderCheckout).subscribe({
      next:(resp)=>{
        this.isOrdered=true;
        this.orderMessage=resp.success;
        
        
        
        this.order.nativeElement.hidden=true;
        this.order_form.reset({
          location:''
        });
        
        setTimeout(()=>{
          this.isOrdered=false; 
          
        },4000);
      },
      error:(err)=>{
        console.log(err);
      }
    })
    
  }
  
  
}
