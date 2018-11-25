import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: Http) { }

  giveFeedback(feedbackData) {
    return this.http.post('http://localhost:3000/giveFeedback', feedbackData);
  }

  getFeedbacks(productId) {
    return this.http.post('http://localhost:3000/getFeedbacks', {productId: productId});
  }

  userBroughtProduct(productId, userId) {
    return this.http.post('http://localhost:3000/userBroughtProduct', {productId: productId, userId: userId});
  }
}
