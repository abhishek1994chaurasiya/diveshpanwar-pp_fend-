import { Component, OnInit, ChangeDetectorRef, DoCheck } from '@angular/core';
import { CartService } from '../services/cart.service';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../alert/alert.component';
import { ProfileService } from '../services/profile.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as $ from 'jquery';
import { CheckoutService } from '../services/checkout.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { AddressService } from '../services/address.service';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  products: any[];
  userId = null;
  userLoggedIn = null;
  total = 0;
  grandTotal = 0;
  deliveryCharges = 300;
  cards = [];
  addresses = [];
  checkoutForm: FormGroup;
  selectedCard = null;
  selectedAddress = null;
  constructor(
    private cartService: CartService,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private checkoutService: CheckoutService,
    private router: Router,
    private notificationService: NotificationService,
    private addressService: AddressService,
    private cardService: CardService
  ) {}

  ngOnInit() {
    this.total = 0;
    this.addresses = [];
    this.cards = [];
    this.checkoutForm = this.formBuilder.group({
      userId: [null, Validators.required, null],
      addressId: [null, Validators.required, null],
      cardId: [null, Validators.required, null],
      grandTotal: [null, Validators.required, null],
      orderDate: [null, Validators.required, null],
      orderStatus: ['open', Validators.required, null],
      products: [null, Validators.required, null]
    });
    this.userId = window.sessionStorage.getItem('user_id');
    const status = window.sessionStorage.getItem('loggedIn');
    if (status === 'true') {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }

    this.cartService.getCartItems(this.userId).subscribe(
      res => {
        this.products = res.json();
        if (this.products) {
          this.products.forEach(element => {
            let qty = Number(element.productQuantity);
            let price = Number(element.offerPrice);
            let extra = element.extra ? Number(element.extra) : 0;
            this.total = this.total + (qty * price - extra);
            if (this.total > 1000) {
              this.deliveryCharges = 0;
            }
            this.grandTotal = this.total + this.deliveryCharges;
            this.checkoutForm.patchValue({
              userId: this.userId,
              grandTotal: this.grandTotal,
              orderDate: new Date(),
              products: this.products
            });
          });
        }
        window.localStorage.cart = JSON.stringify(res.json());
      },
      err => {
        console.log(err);
      }
    );

    if (this.userId) {
      this.profileService.fetchAddresses(this.userId).subscribe(
        res => {
          this.addresses = res.json();
          this.cdRef.detectChanges();
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
      this.profileService.fetchCards(this.userId).subscribe(
        res => {
          this.cards = res.json();
          this.cdRef.detectChanges();
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

  selectCard(card) {
    const dateArray = card.expiry.split('-');
    const monthToday = new Date().getMonth() + 1;
    const yearToday = new Date().getFullYear();
    if (yearToday > Number(dateArray[0]) || monthToday > Number(dateArray[1])) {
      this.checkoutForm.patchValue({
        cardId: null
      });
      const dialogRef = this.dialog.open(AlertComponent, {
        width: '50%',
        data: {
          type: 'danger',
          message: `Selected Card has expired. Choose another card.`
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    } else {
      this.selectedCard = card._id;
      this.checkoutForm.patchValue({
        cardId: this.selectedCard
      });
    }
  }

  selectAddress(addressId) {
    this.selectedAddress = addressId;
    this.checkoutForm.patchValue({
      addressId: this.selectedAddress
    });
  }

  placeOrder() {
    console.log(this.checkoutForm.value);
    this.checkoutService.placeOrder(this.checkoutForm.value).subscribe(
      res => {
        const dialogRef = this.dialog.open(AlertComponent, {
          width: '50%',
          data: {
            type: 'success',
            message: `Order placed successfully with id ${res.json().orderId}.`
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.router.navigate(['/orders']);
          window.localStorage.removeItem('cart');
          this.notificationService
            .getUnreadNotifications(this.userId)
            .subscribe(
              notifications => {
                window.localStorage.notifications = JSON.stringify(
                  notifications.json()
                );
              },
              err => {
                console.log(err);
              }
            );
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

  editAddress(addressId) {
    this.router.navigate(['/editAddress', addressId]);
  }

  editCard(cardId) {
    this.router.navigate(['/editCard', cardId]);
  }

  deleteAddress(addressId) {
    this.addressService.deleteAddress(addressId).subscribe(
      res => {
        const dialogRef = this.dialog.open(AlertComponent, {
          width: '50%',
          data: {
            type: 'success',
            message: `Address Successfully Deleted`
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.checkoutForm.patchValue({
            addressId: null
          });
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

  deleteCard(cardId) {
    this.cardService.deleteCard(cardId).subscribe(
      res => {
        const dialogRef = this.dialog.open(AlertComponent, {
          width: '50%',
          data: {
            type: 'success',
            message: `Address Successfully Deleted`
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.checkoutForm.patchValue({
            cardId: null
          });
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
