import {
  Component,
  OnInit,
  DoCheck,
  Inject,
  ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { NotificationService } from '../services/notification.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  title = 'E-Kart';
  userLoggedIn = false;
  searchForm: FormGroup;
  cartCount = 0;
  dialogRef = null;
  products: any;
  userId = null;
  requestSent = false;
  notificationCount = 0;
  notificationRequestSent = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private productService: ProductService,
    private cartService: CartService,
    private notificationService: NotificationService
  ) {
    console.log(this.userLoggedIn);
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchCriteria: ['']
    });
  }

  ngDoCheck(): void {
    const status = window.sessionStorage.getItem('loggedIn');
    if (status === 'true') {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
    if (window.localStorage.notifications) {
      const notifications = JSON.parse(window.localStorage.notifications);
      this.notificationCount = notifications.length;
      // console.log(this.notificationCount);
    } else if (this.userLoggedIn && !this.notificationRequestSent) {
      this.notificationService.getUnreadNotifications(this.userId).subscribe(
        notifications => {
          window.localStorage.notifications = JSON.stringify(notifications.json());
          this.notificationRequestSent = true;
        }, err => {
          console.log(err);
          this.notificationRequestSent = false;
        }
      );
    }
    if (window.localStorage.cart) {
      let cart = JSON.parse(window.localStorage.cart);
      this.cartCount = cart.length;
      // console.log(this.cartCount);
    } else if (this.userLoggedIn && !this.requestSent) {
      this.userId = window.sessionStorage.getItem('user_id');
      this.cartService.getCartItems(this.userId).subscribe(
        res => {
          console.log(res.json());
          this.requestSent = true;
          window.localStorage.cart = JSON.stringify(res.json());
        },
        err => {
          console.log(err);
          this.requestSent = false;
        }
      );
    } else {
      this.cartCount = 0;
      this.notificationCount = 0;
    }
    this.cdRef.detectChanges();
  }

  logout() {
    window.sessionStorage.clear();
    this.userId = null;
    this.userLoggedIn = null;
    this.requestSent = false;
    window.localStorage.removeItem('cart');
    window.localStorage.removeItem('notifications');
    this.router.navigate(['/login']);
  }

  search(): void {
    this.products = null;
    if (this.searchForm.get('searchCriteria').value) {
      this.productService.searchProduct(this.searchForm.value).subscribe(
        res => {
          console.log(res.json());
          this.products = res.json();
          this.dialogRef = this.dialog.open(SearchResultDialogComponent, {
            width: '90%',
            data: { products: this.products }
          });

          this.dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.searchForm.reset();
          });
        },
        err => {
          console.log(err);
          this.products = false;
          this.dialogRef = this.dialog.open(SearchResultDialogComponent, {
            width: '90%',
            data: { products: this.products }
          });

          this.dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
        }
      );
    }
  }
}

@Component({
  selector: 'app-search-diaog',
  templateUrl: 'search-result.dialog.component.html',
  styleUrls: ['./search-result.dialog.component.css']
})
export class SearchResultDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SearchResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    console.log('I am clicked');
    this.dialogRef.close();
  }
}
