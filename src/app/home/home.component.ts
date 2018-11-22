import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

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
  constructor(private productService: ProductService, private router: Router, private cdref: ChangeDetectorRef) {}

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
        this.cdref.detectChanges();
      }
    );
  }

  showProduct(productId) {
    this.router.navigate(['/product', productId]);
  }
}
