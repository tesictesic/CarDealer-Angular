import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-delete',
  templateUrl: './admin-delete.component.html',
  styleUrl: './admin-delete.component.css'
})
export class AdminDeleteComponent {
  isDisabled=false;
  errorDisabledModal=true;
  table:string='';
  errorMsg='';
  id:number=-1;
  constructor(
    private adminService:AdminService
  ){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.adminService.$openDeleteModal.subscribe(item=>{
      this.isDisabled=item;
    });
    this.adminService.$table.subscribe(item=>{
      this.table=item;
    });
    this.adminService.$id.subscribe(item=>{
      this.id=item;
    })
  }
  closeModal(){
    this.adminService.$openDeleteModal.next(false);
  }
  delete(){
    this.adminService.deleteTable(this.id).subscribe({
      next:(resp)=>{
        console.log(resp);
        this.adminService.$insertTriger.next(true);
        this.closeModal();
      },
      error:(err)=>{
        console.log(err);
        this.errorMsg=err.error.error;
        console.log(this.errorMsg);
        this.closeModal();
        this.errorDisabledModal=false
        setTimeout(()=>{
          this.errorDisabledModal=true;
        },4000);
        
      }
    })
  }
}
