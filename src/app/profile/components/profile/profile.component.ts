import { Component, ElementRef, ViewChild } from '@angular/core';
import { IProfile } from '../../interfaces/i-profile';
import { AuthorizationService } from '../../../login/services/authorization.service';
import { UserService } from '../../services/user.service';
import { IOrderItems } from '../../interfaces/i-order-items';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  @ViewChild('previous') previous!:ElementRef
  @ViewChild('next') next!:ElementRef
 userId:number=-1;
 user:IProfile|null=null;
 currentPage:number=1;
 lastPage:number=-1;
 perPage:number=4;
 paginationArr:number[]=[]

 userCars:number|null=null
 userOrderCars:IOrderItems[]=[];
  constructor(
    private authService:AuthorizationService,
    private userService:UserService
  ){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let user=this.authService.getDataFromLoggedUser();
    if(user!=null){
     let splitedUser:any=user as Object
     this.userId=splitedUser.id
     console.log(this.userId)
     this.getData();
     
     
    }
  }
  getData(){
    this.userService.getUser(this.currentPage,this.userId).subscribe({
      next:(data)=>{
        console.log(data);
        this.user=data.user
        console.log(this.user)
        this.lastPage=data.userOrders.last_page
        this.currentPage=data.userOrders.current_page;
        this.userCars=data.userCars
        this.fillInOrderCars(data.userOrders.data);
      },
      error:(err)=>{
        console.log(err);
      }
     })
  }
  fillInOrderCars(array:any){
    this.paginationArr.length=0;
    this.userOrderCars=[];
    if((this.currentPage)<=1) this.previous.nativeElement.hidden=true;
    else this.previous.nativeElement.hidden=false;
    if((this.currentPage)>=(this.lastPage)) this.next.nativeElement.hidden=true;
    else this.next.nativeElement.hidden=false;
    for(let element of array){
     let item:IOrderItems={
      car:element.marka_naziv+" "+element.model_naziv+" "+element.label,
      image:element.image,
      horsepower:element.horsepower,
      fuel:element.gorivo_naziv,
      price:element.price,
      year:element.year,
      statusId:element.status_id,
      statusName:element.status_name,
      location:element.location
     };
     this.userOrderCars.push(item);
    }
    for(let i=1;i<=this.lastPage;i++){
      this.paginationArr.push(i);
    }
  }
  moveNext(){
    this.currentPage++
    this.getData();
  }
  movePrevious(){
    this.currentPage--;
    this.getData();
  }
  changePage(page:number){
    this.currentPage=page;
    this.getData();
  }
}
