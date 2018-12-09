import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: Http) {}

  allProducts() {
    return this.http.get('https://diveshpanwar-heroku1.herokuapp.com/products');
  }

  allCategories() {
    return this.http.get('https://diveshpanwar-heroku1.herokuapp.com/categories');
  };

  allDeals() {
    return this.http.get('https://diveshpanwar-heroku1.herokuapp.com/deals');
  }

  singleProduct(productId) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/singleProduct', {productId: productId});
  }

  searchProduct(searchData) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/searchProduct', searchData);
  }

  getProductCategory(category) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/getProductCategory', {category: category});
  }
}
