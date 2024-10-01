import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  @ViewChild('previous') previous!:ElementRef
  @ViewChild('next') next!:ElementRef
  @ViewChild('table_elem') table_elem!:ElementRef;
    currentPage:number=1;
    lastPage:number=-1;
    paginationArr:number[]=[];
    filteredParams:any={}
  columns:string[]=[];
  table:string='';
  data:any=[];
  constructor(
    private activeRoute:ActivatedRoute,
    private getDataService:AdminService
  ){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.activeRoute.params);
    this.activeRoute.params.subscribe(item=>{
      this.getDataService.$table.next(item['table']);
      this.currentPage=1;
     this.paginationAdmin();
    });
    this.getDataService.$openInsert.subscribe(item=>{
      if(!item && this.table_elem!=undefined) this.table_elem.nativeElement.style.display="block";
    });
    this.getDataService.$openUpdate.subscribe(item=>{
      if(!item && this.table_elem!=undefined) this.table_elem.nativeElement.style.display="block";
    })
    this.getDataService.$insertTriger.subscribe(item=>{
      if(item) {
        this.paginationAdmin();
      }
    })
   

  }
  
  loadPagination(){
    if((this.currentPage)<=1) this.previous.nativeElement.hidden=true;
    else this.previous.nativeElement.hidden=false;
    if((this.currentPage)>=(this.lastPage)) this.next.nativeElement.hidden=true;
    else this.next.nativeElement.hidden=false;
    this.paginationArr.length=0;
    for(let i=1;i<=this.lastPage;i++){
      this.paginationArr.push(i);
    }
  }
  moveNext(){
    this.currentPage++
    this.paginationAdmin();
    
  }
  movePrevious(){
    this.currentPage--;
    this.paginationAdmin();
  }
  changePage(page:number){
    this.currentPage=page;
    this.paginationAdmin();
   
  }
  paginationAdmin(){
    this.getDataService.getData(this.currentPage).subscribe({
      next:(data)=>{
        console.log(data);
        this.table=data.tabela;
        this.columns=data.columns;
        this.currentPage=data.data.current_page;
        this.lastPage=data.data.last_page;
        this.data=data.data.data;
        this.loadPagination();
        this.modifyColumnsName(this.columns);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  modifyColumnsName(arr:Array<string>){
    let pom_array:string[]=[];
    for(let elem of arr){
      if(elem.includes("_id")){
        let indeOx=elem.indexOf("_id");
        let cutName=elem.substring(indeOx,elem.length);
        let finallyName=elem.replace(cutName,"_name");
        pom_array.push(finallyName);
      }
      else{
        pom_array.push(elem);
      }
    }
    this.columns=pom_array;
  }
  insertData(){
    this.table_elem.nativeElement.style.display="none";
    this.getDataService.$openInsert.next(true);
   
  }
  deleteData(id:number){
    this.getDataService.$openDeleteModal.next(true);
    this.getDataService.$id.next(id);
  }
  updateData(id:number){
    this.table_elem.nativeElement.style.display='none';
    this.getDataService.$openUpdate.next(true);
    this.getDataService.$id.next(id);
  }
}
