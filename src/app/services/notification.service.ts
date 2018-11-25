import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: Http) { }

  getNotifications(userId) {
    return this.http.post('http://localhost:3000/getNotifications', {userId: userId});
  }

  updateNotification(notification) {
    return this.http.post('http://localhost:3000/updateNotification', notification);
  }

  getOrderDetail(orderId) {
    return this.http.post('http://localhost:3000/getOrderDetail', {orderId: orderId});
  }

  getUnreadNotifications(userId) {
    return this.http.post('http://localhost:3000/getUnreadNotifications', {userId: userId});
  }
}
