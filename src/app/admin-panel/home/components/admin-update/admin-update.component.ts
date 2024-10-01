import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { CarService } from '../../../../cars/services/car.service';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrl: './admin-update.component.css'
})
export class AdminUpdateComponent {
  isTrigerred:boolean=false;
  @ViewChild('fileInput') fileInput!: ElementRef;
  table:string='';
  form:any = new FormGroup({});
  picture:File|null=null;
  roles_arr:any;
  roleObj:any
  brand_arr:any;
  brandObj:any;
  car_type_arr:any;
  carTypeObj:any;
  fuel_arr:any;
  fuelObj:any;
  color_arr:any;
  colorObj:any
  model_arr:any
  modelObj:any;
  vehicle_price_arr:any
  vehiclePriceObj:any;
  vehicleObj:any;
  userObj:any;
  isError:boolean=false;

  constructor(
    private adminService:AdminService,
    private carService:CarService
  ){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.adminService.$table.subscribe(item=>{
      this.table=item;
      this.resetForm();
      console.log(this.form);
      if(this.table=="users"){
        this.resetForm();
        this.form.addControl('first_name', new FormControl('', [Validators.required,Validators.pattern(/^[A-Z][a-z]{3,}$/)]));
        this.form.addControl('last_name', new FormControl('', [Validators.required,Validators.pattern(/^[A-Z][a-z]{3,}$/)]));
        this.form.addControl('email', new FormControl('', [Validators.required, Validators.email]));
        this.form.addControl('role_id', new FormControl('', [Validators.required]));
        this.form.addControl('picture',new FormControl('',[Validators.pattern(/\.(jpg|jpeg|png)$/i)]))
      }
      else if(this.table=='vehicles'){
        this.resetForm();
        this.form.addControl('label',new FormControl('',[Validators.minLength(3)]))
        this.form.addControl('horsepower',new FormControl('',[Validators.required,Validators.minLength(1)]))
        this.form.addControl('description',new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(500)]))
        this.form.addControl('year',new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(4)]))
        this.form.addControl('image',new FormControl('',[Validators.pattern(/\.(jpg|jpeg|png)$/i)]))
        this.form.addControl('brand_id',new FormControl('',[Validators.required]))
        this.form.addControl('model_id',new FormControl('',[Validators.required]))
        this.form.addControl('car_body_id',new FormControl('',[Validators.required]))
        this.form.addControl('fuel_id',new FormControl('',[Validators.required]))
        this.form.addControl('color_id',new FormControl('',[Validators.required]))
        this.form.addControl('price',new FormControl('',[Validators.required]))
        this.form.addControl('seats',new FormControl('',[Validators.required]))
      }
      else if(this.table=='vehiclePrice'){
        this.resetForm();
        this.form.addControl('vehicle_id',new FormControl('',[Validators.required]));
        this.form.addControl('price',new FormControl('',[Validators.required]))
        this.form.addControl('date_of',new FormControl('',[Validators.required]))
        this.form.addControl('date_to',new FormControl(''))
      }
      else if(this.table=='models'){
        this.resetForm();
        this.form.addControl('model_name', new FormControl('', [Validators.required]));
        this.form.addControl('brand_id', new FormControl('', [Validators.required]));
      }
      else{
        this.resetForm();
        this.form.addControl("name",new FormControl('',[Validators.required]));
        this.form.addControl("table",new FormControl(this.table));
      }
      if(this.table!='brands' && this.table!='roles')
      this.adminService.getDataforForm().subscribe({
        next:(data)=>{
       
          console.log(this.table);
          if(this.table==='users'){
            this.roles_arr=data.niz
        
          } 
          else if(this.table=='vehicles'){
            this.brand_arr=data[0].niz;
            this.car_type_arr=data[0].niz2;
            this.fuel_arr=data[0].niz3;
            this.color_arr=data[0].niz4;
            this.model_arr=data[0].niz5;
          }
          else if(this.table=='models'){
            this.brand_arr=data.niz
          }
          else if(this.table=='vehiclePrice'){
            this.vehicle_price_arr=data.niz;
          }
        },
        error:(err)=>{
          console.log(err);
        }
      })
      
    });
    this.adminService.$openUpdate.subscribe(item=>{
      this.isTrigerred=item;
    })
    this.adminService.$id.subscribe(item=>{
      if(item!=0 && item!=undefined){
       this.adminService.getDataObj(item).subscribe({
         next:(data)=>{
          
           console.log(data);
           console.log(this.form);
           if(this.table=='users') {
             this.userObj=data.objekat
             this.form.patchValue({
              first_name:this.userObj.first_name,
              last_name:this.userObj.last_name,
              email:this.userObj.email,
              role_id:this.userObj.role_id,
             });
             
           }
           else if(this.table=='roles') {
             this.roleObj=data.objekat;
          
             this.form.patchValue({
              name:this.roleObj.name,
              table:this.table
             });
             
           }
           else if(this.table=='vehicles') {
             this.vehicleObj=data.objekat;
             
             this.form.patchValue({
              label:this.vehicleObj.label,
              horsepower:this.vehicleObj.horsepower,
              description:this.vehicleObj.description,
              year:this.vehicleObj.year,
              brand_id:this.vehicleObj.parent_id,
              model_id:this.vehicleObj.brand_id,
              car_body_id:this.vehicleObj.car_body_id,
              fuel_id:this.vehicleObj.fuel_id,
              color_id:this.vehicleObj.color_id,
              price:this.vehicleObj.price,
              seats:this.vehicleObj.seats
             });
            
           }
           else if(this.table=='vehiclePrice') {
             this.vehiclePriceObj=data.objekat;
             this.form.patchValue({
              vehicle_id:this.vehiclePriceObj.id,
              price:this.vehiclePriceObj.price,
              date_of:this.vehiclePriceObj.date_of,
              date_to:this.vehiclePriceObj.date_to!=null? this.vehiclePriceObj.date_to:'',
             });
             
           }
           else if(this.table=='models') {
             this.modelObj=data.objekat;
             this.form.patchValue({
              model_name:this.modelObj.model_name,
              brand_id:this.modelObj.parent
             });
            
           }
           else if(this.table=='brands') {
             this.brandObj=data.objekat;
             this.form.patchValue({
              name:this.brandObj.name,
              table:this.table
             });
             
           }
          
         },
         error:(err)=>{
           console.log(err);
         }
       })
      }
     })
    
  }
  getBack(){
    this.adminService.$openUpdate.next(false);
    this.picture=null;
    this.form.value.picture=null;
    if(this.table=='users'){
      this.form.reset({
        picture:''
      });
    }
    else if(this.table=='vehicles'){
      this.form.reset({
        image:''
      });
    }
    

    //this.resetForm();
  }
  triggerFileInput() {
   
    this.fileInput.nativeElement.click();
  }
  uploadPicture(event:any){
    const file=event.target.files[0];
    if(file!=undefined){
      console.log(file);
    this.picture=file
    }
   }
   resetForm(){
    this.form=new FormGroup({})
   }
   
   update(){
    if(this.table=='users'){
      const formData:FormData= new FormData();
      formData.append("first_name",this.form.value.first_name)
      formData.append("last_name",this.form.value.last_name)
      formData.append("email",this.form.value.email)
      
      if(this.picture!=null) formData.append("picture",this.picture);
      formData.append("role_id",this.form.value.role_id)
      this.updateService(formData);
    }
    else if(this.table==='vehicles'){
      const formData:FormData= new FormData();
      if(this.form.value.label!=''){
        formData.append("label",this.form.value.label);
      }
      formData.append("horsepower",this.form.value.horsepower)
      formData.append("year",this.form.value.year)
      formData.append("price",this.form.value.price)
      formData.append("description",this.form.value.description)
      if(this.picture!=null) formData.append("image",this.picture);
      formData.append("brand_id",this.form.value.brand_id)
      formData.append("model_id",this.form.value.model_id)
      formData.append("car_body_id",this.form.value.car_body_id)
      formData.append("fuel_id",this.form.value.fuel_id)
      formData.append("color_id",this.form.value.color_id)
      formData.append("seats",this.form.value.seats)
      this.updateService(formData);
    }
    else{
      console.log(this.form.value);
      let obj=this.form.value;
      console.log(obj);
      this.updateService(obj);
    }
    
    
    
    
    
   }
   updateService(obj:FormData|any){
    
     this.adminService.updateTable(this.adminService.$id.getValue(),obj).subscribe({
       next:(resp)=>{
         console.log(resp);
         this.adminService.$openUpdate.next(false);
         this.adminService.$table.next(this.table);
         this.adminService.$insertTriger.next(true);
         
       },
       error:(err)=>{
        console.log(err);
      }
     })
   }
}
