import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: Http) { }

  getNotifications(userId) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/getNotifications', {userId: userId});
  }

  updateNotification(notification) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/updateNotification', notification);
  }

  getOrderDetail(orderId) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/getOrderDetail', {orderId: orderId});
  }

  getUnreadNotifications(userId) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/getUnreadNotifications', {userId: userId});
  }
}
