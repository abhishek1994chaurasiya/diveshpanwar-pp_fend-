import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: Http) { }

  addBulkCart(products) {
    return this.http.post('http://localhost:3000/addBulkCart', {products: products});
  }
}
