import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthorizationService } from '../../login/services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfile{

  constructor(private authService: AuthorizationService, private router: Router) {}

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLogged = this.authService.isLogged();
    const url = next.parent?.url[0].path //url
    if (!isLogged && url === 'profile') {
      this.router.navigateByUrl('/home');
      return false;
    }
    return true;
  }
}
