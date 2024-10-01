import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './security/guards/admin-guard.guard';
import { UserLogged } from './security/guards/user-logged-guard.guard';
import { UserProfile } from './security/guards/user-profile-guard.guard';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    redirectTo:'/home'
  }
  ,
  {
    path:"home",
    loadChildren:()=>import("./home/home.module").then(m=>m.HomeModule)
  },
  {
    path:"cars",
    loadChildren:()=>import("./cars/cars.module").then(m=>m.CarsModule)
  },
  {
    path:"contact",
    loadChildren:()=>import("./contact/contact.module").then(m=>m.ContactModule)
  },
  {
    path:"login",
    loadChildren:()=>import("./login/login.module").then(m=>m.LoginModule),
    canActivateChild:[UserLogged] //guards
  },
  {
    path:"register",
    loadChildren:()=>import("./register/register.module").then(m=>m.RegisterModule),
    canActivateChild:[UserLogged] //guards
  },
  {
    path:"profile",
    loadChildren:()=>import("./profile/profile.module").then(m=>m.ProfileModule),
    canActivateChild:[UserProfile] 
  },
  {
    path:"admin",
    loadChildren:()=>import("./admin-panel/admin-panel.module").then(m=>m.AdminPanelModule),
    canActivateChild:[AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
