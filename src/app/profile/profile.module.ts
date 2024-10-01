import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { DatecustompipePipe } from './customPipes/datecustompipe.pipe';


@NgModule({
  declarations: [
    ProfileComponent,
    DatecustompipePipe
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
