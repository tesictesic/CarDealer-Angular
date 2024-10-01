import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminDeleteComponent } from './components/admin-delete/admin-delete.component';
import { AdminInsertComponent } from './components/admin-insert/admin-insert.component';
import { AdminPanelModule } from '../admin-panel.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminUpdateComponent } from './components/admin-update/admin-update.component';


@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    AdminDeleteComponent,
    AdminInsertComponent,
    AdminUpdateComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
