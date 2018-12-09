import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: Http) { }

  addCard(formData) {
    console.log(formData);
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/addCard', formData);
  }

  fetchCard(cardId) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/fetchCard', {cardId: cardId});
  }

  editCard(formData) {
    // console.log(formData);
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/editCard', formData);
  }

  deleteCard(cardId) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/deleteCard', {cardId: cardId});
  }


}
