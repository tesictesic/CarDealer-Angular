import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 
  countValue1 = 0;
  countValue2 = 0;
  countValue3 = 0;
  countValue4=  0;
  counter_started=false;

  @ViewChild('counterSection',{static:true}) counterSection!:ElementRef
  targetValues = [1000, 1280, 12,26];
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const elementPosition = this.counterSection.nativeElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
   
    // Ako je korisnik skrolovao više od 100px, dodaj klasu
    if (elementPosition.top < viewportHeight && !this.counter_started) {
      this.counter_started = true;
      this.startCounter(1,this.targetValues[0],2000);
      this.startCounter(2,this.targetValues[1],2000);
      this.startCounter(3,this.targetValues[2],2000);
      this.startCounter(4,this.targetValues[3],2000);
    } 
  }


 startCounter(counterIndex: number, targetValue: number,duration:number) {
  const intervalTime = 50; // Interval u milisekundama
  const step = targetValue / (duration / intervalTime);

  const counterInterval = setInterval(() => {
    switch (counterIndex) {
      case 1:
        this.countValue1 += step;
        if (this.countValue1 >= targetValue) {
          this.countValue1 = targetValue;
          clearInterval(counterInterval);
        }
        break;
      case 2:
        this.countValue2 += step;
        if (this.countValue2 >= targetValue) {
          this.countValue2 = targetValue;
          clearInterval(counterInterval);
        }
        break;
      case 3:
        this.countValue3 += step;
        if (this.countValue3 >= targetValue) {
          this.countValue3 = targetValue;
          clearInterval(counterInterval);
        }
        break;
      case 4:
      this.countValue4+=step
      if(this.countValue4>=targetValue){
        this.countValue4=targetValue;
        clearInterval(counterInterval);
      }
      break;
    }
  }, intervalTime);
}
}
