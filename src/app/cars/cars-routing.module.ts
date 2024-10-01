import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './components/cars/cars.component';
import { SinglePageComponent } from './components/single-page/single-page.component';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    component:CarsComponent
  },
  {
    path:":id",
    component:SinglePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule { }
