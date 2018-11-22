import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: Http) {}

  allProducts() {
    return this.http.get('http://localhost:3000/products');
  }

  singleProduct(productId) {
    return this.http.post('http://localhost:3000/singleProduct', {productId: productId});
  }

  searchProduct(searchData) {
    return this.http.post('http://localhost:3000/searchProduct', searchData);
  }
}
