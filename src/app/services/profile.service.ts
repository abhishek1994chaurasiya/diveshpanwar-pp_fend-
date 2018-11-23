import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: Http) { }

  fetchProfileData(userId) {
    return this.http.post('http://localhost:3000/getProfileData', {userId: userId});
  }

  fetchAddresses(userId) {
    return this.http.post('http://localhost:3000/getAddresses', {userId: userId});
  }

  fetchCards(userId) {
    return this.http.post('http://localhost:3000/getCards', {userId: userId});
  }
}
