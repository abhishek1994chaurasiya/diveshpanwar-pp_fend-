import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: Http) { }

  addCard(formData) {
    console.log(formData);
    return this.http.post('http://localhost:3000/addCard', formData);
  }

  fetchCard(cardId) {
    return this.http.post('http://localhost:3000/fetchCard', {cardId: cardId});
  }

  editCard(formData) {
    // console.log(formData);
    return this.http.post('http://localhost:3000/editCard', formData);
  }

}
