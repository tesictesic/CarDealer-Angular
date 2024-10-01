import { Component, ViewEncapsulation } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent {
  isDisabled:boolean=false;
  table:string=''
  constructor(
    private AdminService:AdminService
  ){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.AdminService.$table.subscribe(item=>{
      this.table=item;
    })
    this.AdminService.$openInsert.subscribe(item=>{
      if(item) this.isDisabled=true
      else this.isDisabled=false;
    })
    this.AdminService.$openUpdate.subscribe(item=>{
      if(item) this.isDisabled=true
      else this.isDisabled=false;
    })
  }
}
