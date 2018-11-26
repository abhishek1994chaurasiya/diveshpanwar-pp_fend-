import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import {
  MatDialog,
  MatBottomSheet,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA
} from '@angular/material';

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
  category = null;
  categories: any;
  constructor(
    private productService: ProductService,
    private router: Router,
    private cdref: ChangeDetectorRef,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
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

    this.productService.allCategories().subscribe(
      res => {
        console.log(res.json());
        this.categories = res.json();
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

  openCategorySheet(): void {
    this.category = null;
    const cateorySheet = this.bottomSheet.open(ProductCategoryComponent, {
      data: { categories: this.categories }
    });

    cateorySheet.afterDismissed().subscribe(result => {
      this.category = result;
      if (this.category === 'all') {
        this.ngOnInit();
      } else if (this.category) {
        console.log(this.category);
        this.products = false;
        this.productService.getProductCategory(this.category).subscribe(
          res => {
            this.products = res.json();
          },
          err => {
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
    });
  }
}

@Component({
  selector: 'app-news-category',
  templateUrl: 'product-category.component.html'
})
export class ProductCategoryComponent {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ProductCategoryComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {}

  openLink(category): void {
    this.bottomSheetRef.dismiss(category);
    return category;
  }
}
