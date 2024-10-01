import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot,  Router, RouterStateSnapshot } from '@angular/router';
import { AuthorizationService } from '../../login/services/authorization.service';

@Injectable({
  providedIn:'root'
})
export class UserLogged{

  constructor(
    private authService:AuthorizationService,
    private router:Router,
    private activeRoute:ActivatedRoute
  ){}
  canActivateChild(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    const isLogged = this.authService.isLogged();
      if(isLogged) this.router.navigateByUrl("/home");
    

  }
}