import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: Http) { }

  addToWishlist(wishlist) {
    console.log(wishlist);
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/addToWishlist', wishlist);
  }

  getWishlist(userId) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/getWishlist', {userId: userId});
  }

  removeFromWishList(wishlistId) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/removeFromWishList', {wishlistId: wishlistId});
  }

  addToCart(product) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/addFromWishlist', product);
  }

}
