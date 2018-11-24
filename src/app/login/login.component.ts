import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../alert/alert.component';

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
    private router: Router,
    private cartService: CartService,
    private dialog: MatDialog
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
          const userId = res.userId;
          window.sessionStorage.setItem('user_id', res.id);
          window.sessionStorage.setItem('loggedIn', 'true');

          if (window.localStorage.cart) {
            let cartArray = [];
            const cart = JSON.parse(window.localStorage.cart);
            cart.forEach(element => {
              element.userId = userId;
              cartArray.push(element);
            });
            this.cartService.addBulkCart(cartArray).subscribe(
              res => {
                console.log(res.json());
                const dialogRef = this.dialog.open(AlertComponent, {
                  width: '80%',
                  data: {
                    type: 'success',
                    message: res.json().insertedCount
                      ? `${res.json().insertedCount} Products added to cart.`
                      : res.json().notAdded === 0
                      ? `${res.json().added} Products added to cart.`
                      : `${res.json().added} Products added, ${
                          res.json().notAdded
                        } not added to cart due to max quantity.`
                  }
                });

                dialogRef.afterClosed().subscribe(result => {
                  console.log('The dialog was closed');
                  window.localStorage.removeItem('cart');
                  this.router.navigate(['/cart']);

                });
              },
              err => {
                console.log(err);
              }
            );
          } else {
            window.localStorage.removeItem('cart');
            this.router.navigate(['/cart']);

          }
        },
        err => {
          this.invalidPassword = true;
          console.log(err);
        }
      );
    }
  }
}
