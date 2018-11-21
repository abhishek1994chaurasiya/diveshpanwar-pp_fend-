import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  mailSent = false;
  response = false;
  invalidPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private cdref: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.invalidPassword = false;
    if (this.loginForm.invalid) {
      alert('All fields are mandatory.');
    } else {
      this.authService.login(this.loginForm.value).subscribe(
        res => {
          console.log(res);
          window.sessionStorage.setItem('user_id', res.id);
          window.sessionStorage.setItem('loggedIn', 'true');
          this.router.navigate(['/cart']);
        },
        err => {
          this.invalidPassword = true;
          console.log(err);
        }
      );
    }
  }
}
