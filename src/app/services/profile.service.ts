import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: Http) { }

  fetchProfileData(userId) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/getProfileData', {userId: userId});
  }

  fetchAddresses(userId) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/getAddresses', {userId: userId});
  }

  fetchCards(userId) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/getCards', {userId: userId});
  }

  fetchRecommendations(userId) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/getRecommendations', {userId: userId});
  }
}
