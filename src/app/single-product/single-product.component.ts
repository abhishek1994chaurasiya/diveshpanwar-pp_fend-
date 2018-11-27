import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AlertComponent } from '../alert/alert.component';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';
import { FeedbackService } from '../services/feedback.service';
import { NullTemplateVisitor } from '@angular/compiler';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  product: any;
  error = false;
  cartForm: FormGroup;
  maxQty = [];
  userId = null;
  userLoggedIn = null;
  rater = [1, 2, 3, 4, 5];
  rating = 1;
  feedbackForm: FormGroup;
  wishListForm: FormGroup;
  productId = null;
  feedbacks: any[];
  username = null;
  userBroughtProduct = 0;
  userGivenfeedback = 0;
  userRating = 0;
  reviewCount = 0;
  contentLoaded = false;
  constructor(
    private productService: ProductService,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private feedbackService: FeedbackService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userId = window.sessionStorage.getItem('user_id');
    this.username = window.sessionStorage.getItem('username');
    const status = window.sessionStorage.getItem('loggedIn');
    if (status === 'true') {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
    let productId = null;
    this.maxQty = [];
    this.cartForm = this.formBuilder.group({
      productQuantity: 1,
      productId: null,
      userId: null,
      displayName: null,
      price: null,
      offerPrice: null,
      discount: null,
      maxQty: null,
      extra: null,
      imgUrl: NullTemplateVisitor,
      category: null
    });

    this.wishListForm = this.formBuilder.group({
      productQuantity: 1,
      productId: null,
      userId: null,
      displayName: null,
      price: null,
      offerPrice: null,
      discount: null,
      extra: null,
      imgUrl: null,
      maxQty: null,
      category: null
    });

    this.feedbackForm = this.formBuilder.group({
      userId: [null, Validators.required, null],
      rating: [null, Validators.required, null],
      message: [null, Validators.required, null],
      productId: [null, Validators.required, null],
      username: [null, Validators.required, null],
      date: [new Date(), Validators.required, null]
    });

    this.error = false;
    this.route.params.subscribe(param => {
      productId = param.productId;
      this.productId = productId;
      this.cartForm.patchValue({
        productId: productId
      });
      this.wishListForm.patchValue({
        productId: productId
      });
      this.productService.singleProduct(productId).subscribe(
        res => {
          this.maxQty = [];
          this.product = res.json();
          this.cartForm.patchValue(this.product);
          if (this.userId) {
            this.cartForm.patchValue({
              userId: this.userId
            });
          }
          this.wishListForm.patchValue(this.product);
          if (this.userId) {
            this.wishListForm.patchValue({
              userId: this.userId
            });

            this.feedbackForm.patchValue({
              productId: this.productId,
              userId: this.userId,
              rating: 1,
              username: this.username
            });
          }
          for (let i = 0; i < this.product.maxQty; i++) {
            this.maxQty.push(String(i + 1));
          }
          this.contentLoaded = true;
          this.cdRef.detectChanges();
        },
        err => {
          console.log(err);
          this.error = true;
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

          this.cdRef.detectChanges();
        }
      );
      this.feedbackService.getFeedbacks(this.productId).subscribe(
        res => {
          this.feedbacks = res.json();
          // console.log(this.feedbacks);
          let count = this.feedbacks.length;
          this.userRating = 0;
          this.reviewCount = count;
          if (count === 0) {
            this.userRating = 0;
          } else {
            this.feedbacks.forEach(feed => {
              this.userRating = Number(this.userRating) + Number(feed.rating);
            });
            console.log(this.userRating);

            this.userRating = Math.floor(this.userRating / count);
          }
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
      this.userBroughtProduct = 0;
      this.feedbackService
        .userBroughtProduct(this.productId, this.userId)
        .subscribe(
          res => {
            // ;
            this.userBroughtProduct = res.json().count;
          },
          err => {
            console.log(err.json());
          }
        );

      this.userGivenfeedback = 0;
      this.feedbackService
        .userGivenFeedback(this.productId, this.userId)
        .subscribe(
          res => {
            // ;
            this.userGivenfeedback = res.json().count;
          },
          err => {
            console.log(err.json());
          }
        );
    });
  }

  addToCart() {
    let productFound = false;
    let productToAdd: any;
    if (window.localStorage.cart) {
      let productArray = [];
      let cart = JSON.parse(window.localStorage.cart);
      cart.forEach(elem => {
        if (elem.productId === this.cartForm.get('productId').value) {
          productFound = true;
          // console.log(elem);
          if (
            Number(elem.productQuantity) +
              Number(this.cartForm.get('productQuantity').value) >
            Number(this.product.maxQty)
          ) {
            const dialogRef = this.dialog.open(AlertComponent, {
              width: '90%',
              data: {
                type: 'warning',
                message: `You can add only ${
                  this.product.maxQty
                } of this product into cart`
              }
            });

            dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed');
            });
          } else {
            elem.productQuantity =
              Number(elem.productQuantity) +
              Number(this.cartForm.get('productQuantity').value);
            productToAdd = elem;
          }
        }
        productArray.push(elem);
      });

      if (!productFound) {
        productArray.push(this.cartForm.value);
        productToAdd = this.cartForm.value;
      }
      window.localStorage.cart = JSON.stringify(productArray);
      this.snackBar.open('Product added to the cart', 'Close', {
        duration: 500
      });
      // const dialogRef = this.dialog.open(AlertComponent, {
      //   width: '50%',
      //   data: {
      //     type: 'success',
      //     message: `Product added to cart.`
      //   }
      // });

      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed');
      // });
    } else {
      let productArray = [];
      productArray.push(this.cartForm.value);
      window.localStorage.cart = JSON.stringify(productArray);
    }

    if (this.userLoggedIn && productToAdd) {
      this.cartService.addOneProduct(productToAdd).subscribe(
        res => {
          console.log(res);
          this.cdRef.detectChanges();
          // this.snackBar.open('Product added to the cart', 'Close', {
          //   duration: 500
          // });
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  addToWishList() {
    this.wishlistService.addToWishlist(this.wishListForm.value).subscribe(
      res => {
        console.log(res);
        const dialogRef = this.dialog.open(AlertComponent, {
          width: '90%',
          data: {
            type: 'success',
            message: `Product added to wishlist`
          }
        });

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

  changeRating(rate) {
    this.rating = rate;
    this.feedbackForm.patchValue({
      rating: this.rating
    });
  }

  submitFeedback() {
    this.feedbackService.giveFeedback(this.feedbackForm.value).subscribe(
      res => {
        const dialogRef = this.dialog.open(AlertComponent, {
          width: '50%',
          data: {
            type: 'success',
            message: `Feedback recorded successfully.`
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
