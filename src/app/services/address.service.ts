import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: Http) { }

  addAddress(formData) {
    // console.log(formData);
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/addAddress', formData);
  }

  fetchAddress(addressId) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/fetchAddress', {addressId: addressId});
  }

  editAddress(formData) {
    // console.log(formData);
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/editAddress', formData);
  }

  deleteAddress(addressId) {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/deleteAddress', {addressId: addressId});
  }
}
