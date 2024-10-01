import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthorizationService } from '../../login/services/authorization.service';


@Injectable({
  providedIn:'root'
})
export class AdminGuard{
  constructor(
    private authService:AuthorizationService,
    private router:Router
  ){}
  canActivateChild(next:ActivatedRouteSnapshot, state:RouterStateSnapshot){
    const isLogged=this.authService.isLogged();
    var idAdmin=1;
    var isAdmin=false;
    if(isLogged){
      let userObj:any=this.authService.getDataFromLoggedUser();
      console.log(userObj);
      if(idAdmin===userObj.role_id) isAdmin=true;
      else this.router.navigateByUrl("/home");
    }
    else this.router.navigateByUrl("/home");
    return isAdmin;
  }
}

