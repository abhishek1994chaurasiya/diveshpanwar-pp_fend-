import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: Http) { }

  addAddress(formData) {
    // console.log(formData);
    return this.http.post('http://localhost:3000/addAddress', formData);
  }

  fetchAddress(addressId) {
    return this.http.post('http://localhost:3000/fetchAddress', {addressId: addressId});
  }

  editAddress(formData) {
    // console.log(formData);
    return this.http.post('http://localhost:3000/editAddress', formData);
  }
}
