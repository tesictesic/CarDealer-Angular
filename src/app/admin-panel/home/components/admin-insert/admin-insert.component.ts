import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../../../cars/services/car.service';

@Component({
  selector: 'app-admin-insert',
  templateUrl: './admin-insert.component.html',
  styleUrl: './admin-insert.component.css'
})
export class AdminInsertComponent {
  
  isTrigerred:boolean=false;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('model') model!:ElementRef;
  table:string='';
  form:any = new FormGroup({});
  picture:File|null=null;
  roles_arr:any;
  brand_arr:any;
  car_type_arr:any;
  fuel_arr:any;
  color_arr:any;
  model_arr:any
  vehicle_price_arr:any
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
      if(this.table=="users"){
        this.resetForm();
        this.form.addControl('first_name', new FormControl('', [Validators.required,Validators.pattern(/^[A-Z][a-z]{3,}$/)]));
        this.form.addControl('last_name', new FormControl('', [Validators.required,Validators.pattern(/^[A-Z][a-z]{3,}$/)]));
        this.form.addControl('email', new FormControl('', [Validators.required, Validators.email]));
        this.form.addControl('password', new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]));
        this.form.addControl('role_id', new FormControl('', [Validators.required]));
        this.form.addControl('picture',new FormControl('',[Validators.pattern(/\.(jpg|jpeg|png)$/i)]))
      }
      else if(this.table=='vehicles'){
        this.resetForm();
        this.form.addControl('label',new FormControl('',[Validators.minLength(3)]))
        this.form.addControl('horsepower',new FormControl('',[Validators.required,Validators.minLength(1)]))
        this.form.addControl('description',new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(500)]))
        this.form.addControl('year',new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(4)]))
        this.form.addControl('image',new FormControl('',[Validators.required,Validators.pattern(/\.(jpg|jpeg|png)$/i)]))
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
        this.form.addControl('date_to',new FormControl('',[Validators.required]))
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
          console.log(data);
          console.log(this.table);
          if(this.table==='users'){
            this.roles_arr=data.niz
            console.log(this.roles_arr)
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
    this.adminService.$openInsert.subscribe(item=>{
      this.isTrigerred=item;
      console.log(this.form);
    })
    
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.model.nativeElement.style.display="none";
    console.log(this.model);
  }
  getBack(){
    this.adminService.$openInsert.next(false);
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
   insert(){
    
    if(this.table=='users'){
      const formData:FormData= new FormData();
      formData.append("first_name",this.form.value.first_name)
      formData.append("last_name",this.form.value.last_name)
      formData.append("email",this.form.value.email)
      formData.append("password",this.form.value.password)
      if(this.picture!=null) formData.append("picture",this.picture);
      formData.append("role_id",this.form.value.role_id)
      this.insertService(formData);
    }
    if(this.table=='vehicles'){
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
      this.insertService(formData);
    }
    if(this.table=='roles' || this.table=='brands'){
      this.form.patchValue({
        "table":this.table
      });
      
    }
    
    let obj=this.form.value;
    this.insertService(obj);
    
   }
   insertService(obj:FormData|any){
    this.adminService.insertTable(obj).subscribe({
      next:(resp)=>{
        console.log(resp);
        this.adminService.$table.next(this.table);
        this.getBack();
        this.adminService.$insertTriger.next(true);

      },
      error:(err)=>{
        console.log(err);
        if(err.status==422){
         this.isError=true;
        }
      }
    })
   }
   resetForm(){
    this.form=new FormGroup({})
   }
   getModel(id:string){
    let parseId=Number(id);
    this.carService.getModels(parseId).subscribe({
      next:(data)=>{
        this.model.nativeElement.style.display="block";
        console.log(data);
        this.model_arr=data.items;
      },
      error:(err)=>{
        console.log(err);
      }
    })
   }
}
