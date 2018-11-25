import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: Http) {}

  getOrders(userId) {
    return this.http.post('http://localhost:3000/getOrders', {
      userId: userId
    });
  }

  filterOrder(filterData) {
    return this.http.post('http://localhost:3000/filterOrder', filterData);
  }

  updateOrder(order) {
    console.log(order);
    return this.http.post('http://localhost:3000/updateOrder', order);
  }
}
