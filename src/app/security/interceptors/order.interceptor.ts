import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OrderService } from "../../cars/services/order.service";

@Injectable()

export class OrderInterceptor implements HttpInterceptor{
 
  constructor(
    private orderService:OrderService
  ){}
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    if (req.url.includes(this.orderService.urlToOrderCar)) {
      return next.handle(req);
    }
  
    // Odmah šalji originalni HTTP zahtev
    const result$ = next.handle(req);
  
    // Zatim asinhrono promeni status porudžbine (ne čekajući odgovor)
    this.orderService.changeOrderStatus().subscribe({
      error: (err) => console.error('Error updating order status:', err)
    });
    //Ova verzija ne čeka da se status porudžbine promeni pre nego što nastavi sa HTTP zahtevom.
  
    return result$;
  }
//   Originalni HTTP zahtev odmah šalje dalje i ne čeka se da se status porudžbine promeni pre nego što se zahtev završi.

// Status porudžbine se menja asinhrono – tj. paralelno sa originalnim HTTP zahtevom. 
//Ovo znači da možeš nastaviti sa slanjem zahteva bez čekanja na ažuriranje porudžbine, i 
// rezultat tog HTTP zahteva će stići nezavisno od uspešnosti ažuriranja statusa porudžbine.
}