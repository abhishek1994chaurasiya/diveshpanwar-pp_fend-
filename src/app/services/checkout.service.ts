import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: Http) { }

  placeOrder(checkoutForm) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/placeOrder', checkoutForm);
  }
}
