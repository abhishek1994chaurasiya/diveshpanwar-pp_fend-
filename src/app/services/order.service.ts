import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: Http) {}

  getOrders(userId) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/getOrders', {
      userId: userId
    });
  }

  filterOrder(filterData) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/filterOrder', filterData);
  }

  updateOrder(order) {
    console.log(order);
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/updateOrder', order);
  }
}
