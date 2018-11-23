import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(signUpdata): any {
      return this.http.post('http://localhost:3000/signup', signUpdata);
  }

  editProfile(signUpdata): any {
    return this.http.post('http://localhost:3000/editProfile', signUpdata);
}

  login(loginData): any {
    return this.http.post('http://localhost:3000/login', loginData);
  }
}
