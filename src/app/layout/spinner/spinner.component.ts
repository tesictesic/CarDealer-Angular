import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  @ViewChild('spinner') spinner!:ElementRef
  private routerSubscription!: Subscription;
  constructor(
    private renderer: Renderer2,
    private router:Router
  ) {}
ngAfterViewInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.renderer.setStyle(this.spinner.nativeElement, 'transition', 'opacity 1s ease-in-out');
  // Praćenje promena rute
  this.routerSubscription = this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.resetFade();
      this.startFade();
    }
  });
}
ngOnDestroy() {
  // Očisti pretplatu na promene rute
  if (this.routerSubscription) {
    this.routerSubscription.unsubscribe();
  }
}

  
  startFade():void{
    this.renderer.setStyle(this.spinner.nativeElement, 'opacity', '1'); // Postavljanje na 1 pre početka fade
    setTimeout(() => this.renderer.setStyle(this.spinner.nativeElement, 'opacity', '0.8'), 200);
    setTimeout(() => this.renderer.setStyle(this.spinner.nativeElement, 'opacity', '0.6'), 200);
    setTimeout(() => this.renderer.setStyle(this.spinner.nativeElement, 'opacity', '0.4'), 200);
    setTimeout(() => this.renderer.setStyle(this.spinner.nativeElement, 'opacity', '0.2'), 200);
    setTimeout(() => this.renderer.setStyle(this.spinner.nativeElement, 'opacity', '0'), 200);

    setTimeout(() => {
      this.renderer.setStyle(this.spinner.nativeElement, 'display', 'none');
      this.renderer.setStyle(this.spinner.nativeElement, 'visibility', 'hidden');
    }, 1000);
  }
  resetFade() {
    // Resetovanje stilova pre ponovnog pokretanja animacije
    this.renderer.setStyle(this.spinner.nativeElement, 'opacity', '1');
    this.renderer.setStyle(this.spinner.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.spinner.nativeElement, 'visibility', 'visible');
    
    // Pokretanje fade animacije
  }
}
