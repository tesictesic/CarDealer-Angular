import { Component, HostListener } from '@angular/core';
import { AuthorizationService } from '../../login/services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isScrolled = false;
  isLogged:boolean=false;
  userData:any;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    // Ako je korisnik skrolovao više od 100px, dodaj klasu
    if (scrollY > 200) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }
  constructor(
    private authService:AuthorizationService,
    private router:Router
  ){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.isLogged=this.authService.isLogged();
    this.userData=this.authService.getDataFromLoggedUser();
    if(this.userData!=null) console.log(this.userData);
  }
  logout():void{
    this.authService.logout();
    this.isLogged=this.authService.isLogged();
    this.userData.role_id=0;
  }
}

