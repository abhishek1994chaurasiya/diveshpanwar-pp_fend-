import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: Http) { }

  addToWishlist(wishlist) {
    console.log(wishlist);
    return this.http.post('http://localhost:3000/addToWishlist', wishlist);
  }

  getWishlist(userId) {
    return this.http.post('http://localhost:3000/getWishlist', {userId: userId});
  }

  removeFromWishList(wishlistId) {
    return this.http.post('http://localhost:3000/removeFromWishList', {wishlistId: wishlistId});
  }

  addToCart(product) {
    return this.http.post('http://localhost:3000/addFromWishlist', product);
  }

}
