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


  getCartItems(userId) {
    return this.http.post('http://localhost:3000/getCartItems', {userId: userId});
  }

  addOneProduct(productToAdd) {
    return this.http.post('http://localhost:3000/addOneProduct', productToAdd);
  }

  toggleQuantity(product) {
    return this.http.post('http://localhost:3000/toggleQuantity', product);
  }

  removeCartItem(cartId) {
    return this.http.post('http://localhost:3000/removeCartItem', {cartId: cartId});
  }
}
