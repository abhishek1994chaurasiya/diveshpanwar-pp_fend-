import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(signUpdata): any {
      return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/signup', signUpdata);
  }

  editProfile(signUpdata): any {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/editProfile', signUpdata);
}

  login(loginData): any {
    return this.http.post('https://diveshpanwar-heroku1.herokuapp.com/login', loginData);
  }
}
