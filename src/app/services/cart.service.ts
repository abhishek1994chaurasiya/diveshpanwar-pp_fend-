import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: Http) { }

  addBulkCart(products) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/addBulkCart', {products: products});
  }


  getCartItems(userId) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/getCartItems', {userId: userId});
  }

  addOneProduct(productToAdd) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/addOneProduct', productToAdd);
  }

  toggleQuantity(product) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/toggleQuantity', product);
  }

  removeCartItem(cartId) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/removeCartItem', {cartId: cartId});
  }
}
