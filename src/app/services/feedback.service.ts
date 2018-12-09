import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: Http) { }

  giveFeedback(feedbackData) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/giveFeedback', feedbackData);
  }

  getFeedbacks(productId) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/getFeedbacks', {productId: productId});
  }

  userBroughtProduct(productId, userId) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/userBroughtProduct', {productId: productId, userId: userId});
  }

  userGivenFeedback(productId, userId) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/userGivenFeedback', {productId: productId, userId: userId});
  }
}
