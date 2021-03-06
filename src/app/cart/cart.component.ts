import { Component, OnInit, ChangeDetectorRef, DoCheck } from '@angular/core';
import { CartService } from '../services/cart.service';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../alert/alert.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: any[];
  userId = null;
  userLoggedIn = null;
  total = 0;

  constructor(
    private cartService: CartService,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.total = 0;
    this.userId = window.sessionStorage.getItem('user_id');
    const status = window.sessionStorage.getItem('loggedIn');
    if (status === 'true') {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
    if (this.userLoggedIn) {
      this.cartService.getCartItems(this.userId).subscribe(
        res => {
          this.products = res.json();
          if (this.products) {
            this.products.forEach(element => {
              let qty = Number(element.productQuantity);
              let price = Number(element.offerPrice);
              let extra = element.extra ? Number(element.extra) : 0;
              this.total = this.total + (qty * price - extra);
            });
          }
          window.localStorage.cart = JSON.stringify(res.json());
        },
        err => {
          console.log(err);
          const dialogRef = this.dialog.open(AlertComponent, {
            width: '50%',
            data: {
              type: 'danger',
              message: `Something went wrong. Please try again`
            }
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
        }
      );
    } else {
      this.products = JSON.parse(window.localStorage.cart);
      if (this.products) {
        this.products.forEach(element => {
          let qty = Number(element.productQuantity);
          let price = Number(element.offerPrice);
          let extra = element.extra ? Number(element.extra) : 0;
          this.total = this.total + (qty * price - extra);
        });
      }
    }
  }

  removeCartItem(cartItem) {
    if (this.userLoggedIn) {
      this.cartService.removeCartItem(cartItem._id).subscribe(
        res => {
          const dialogRef = this.dialog.open(AlertComponent, {
            width: '50%',
            data: {
              type: 'success',
              message: `Product Successfully removed`
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.ngOnInit();
          });
        },
        err => {
          console.log(err);
          const dialogRef = this.dialog.open(AlertComponent, {
            width: '50%',
            data: {
              type: 'danger',
              message: `Something went wrong. Please try again`
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
        }
      );
    } else {
      let cart = JSON.parse(window.localStorage.cart);
      let cartArray = [];
      cart.forEach(element => {
        if (element.productId !== cartItem.productId) {
          cartArray.push(element);
        }
      });
      window.localStorage.cart = JSON.stringify(cartArray);
      this.ngOnInit();
    }
  }

  increaseQuantity(product) {
    let productToAdd: any;
    this.total = 0;
    let cart = JSON.parse(window.localStorage.cart);
    let cartArray = [];
    cart.forEach(element => {
      if (element.productId === product.productId) {
        element.productQuantity = Number(element.productQuantity) + 1;
        productToAdd = element;
      }
      cartArray.push(element);
    });
    window.localStorage.cart = JSON.stringify(cartArray);
    if (!this.userLoggedIn) {
      this.ngOnInit();
    }
    if (this.userLoggedIn) {
      this.cartService.toggleQuantity(productToAdd).subscribe(
        res => {
          this.ngOnInit();
        },
        err => {
          console.log(err.json());
        }
      );
    }
    this.cdRef.detectChanges();
  }

  decreaseQuantity(product) {
    let productToAdd: any;
    this.total = 0;
    let cart = JSON.parse(window.localStorage.cart);
    let cartArray = [];
    cart.forEach(element => {
      if (element.productId == product.productId) {
        element.productQuantity = Number(element.productQuantity) - 1;
        productToAdd = element;
      }
      cartArray.push(element);
    });

    window.localStorage.cart = JSON.stringify(cartArray);
    if (!this.userLoggedIn) {
      this.ngOnInit();
    }
    if (this.userLoggedIn) {
      this.cartService.toggleQuantity(productToAdd).subscribe(
        res => {
          this.ngOnInit();
        },
        err => {
          console.log(err.json());
        }
      );
    }
    this.cdRef.detectChanges();
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
