import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../alert/alert.component';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  userId: any;
  userLoggedIn: any;
  wishlistData: any;

  ngOnInit() {
    this.userId = window.sessionStorage.getItem('user_id');
    const status = window.sessionStorage.getItem('loggedIn');
    if (status === 'true') {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
    this.wishlistService.getWishlist(this.userId).subscribe(
      res => {
        console.log(res.json());
        this.wishlistData = res.json();
      },
      err => {
        console.log(err.json());
      }
    );
  }

  addToCart(product) {
    console.log(product);
    this.wishlistService.addToCart(product).subscribe(
      res => {
        console.log(res);
        const dialogRef = this.dialog.open(AlertComponent, {
          width: '90%',
          data: {
            type: 'success',
            message: `Product added to Cart`
          }
        });

        this.cartService.getCartItems(this.userId).subscribe(
          response  => {
            window.localStorage.cart = JSON.stringify(response.json());
          },
          err => {
            console.log(err);
          }
        );

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      },
      err => {
        console.log(err.json());
        const dialogRef = this.dialog.open(AlertComponent, {
          width: '90%',
          data: {
            type: err.json() ? 'info' : 'danger',
            message: err.json() ? err.json().message : `Something went wrong`
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }
    );
  }

  removeFromWishList(wishlistId) {
    this.wishlistService.removeFromWishList(wishlistId).subscribe(
      res => {
        console.log(res.json());
        const dialogRef = this.dialog.open(AlertComponent, {
          width: '50%',
          data: {
            type: 'success',
            message: `Product Successfully Removed`
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
  }
}
