import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { MatDialog } from '@angular/material';

interface LangDesc {
  name: string;
  imgUrl: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any;
  deals: any;
  error: any;
  constructor(
    private productService: ProductService,
    private router: Router,
    private cdref: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.error = null;
    this.productService.allProducts().subscribe(
      res => {
        console.log(res.json());
        this.products = res.json();
        this.cdref.detectChanges();
      },
      err => {
        // console.log(err.json());
        this.error = 'Something Wrong Happened. Please try again.';
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
        this.cdref.detectChanges();
      }
    );
    this.productService.allDeals().subscribe(
      res => {
        console.log(res.json());
        this.deals = res.json();
        this.cdref.detectChanges();
      },
      err => {
        // console.log(err.json());
        this.error = 'Something Wrong Happened. Please try again.';
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

        this.cdref.detectChanges();
      }
    );
  }

  showProduct(productId) {
    this.router.navigate(['/product', productId]);
  }
}
