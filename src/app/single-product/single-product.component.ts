import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../alert/alert.component';

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
  constructor(
    private productService: ProductService,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit() {

    this.userId = window.sessionStorage.getItem('user_id');
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
      extra: null
    });
    this.error = false;
    this.route.params.subscribe(param => {
      productId = param.productId;
      this.cartForm.patchValue({
        productId: productId
      });
      this.productService.singleProduct(productId).subscribe(
        res => {
          this.maxQty = [];
          this.product = res.json();
          this.cartForm.patchValue(this.product);
          if(this.userId) {
            this.cartForm.patchValue({
              userId: this.userId
            })
          }
          for (let i = 0; i < this.product.maxQty; i++) {
            this.maxQty.push(String(i + 1));
          }

          this.cdRef.detectChanges();
        },
        err => {
          console.log(err);
          this.error = true;
          this.cdRef.detectChanges();
        }
      );
    });
  }

  addToCart() {
    let productFound = false;
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
          }
        }
        productArray.push(elem);
      });

      if (!productFound) {
        productArray.push(this.cartForm.value);
      }
      window.localStorage.cart = JSON.stringify(productArray);
    } else {
      let productArray = [];
      productArray.push(this.cartForm.value);
      window.localStorage.cart = JSON.stringify(productArray);
    }
  }
}
