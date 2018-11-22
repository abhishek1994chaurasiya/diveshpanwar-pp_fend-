import { Component, OnInit, DoCheck, Inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef
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
    if (window.localStorage.cart) {
      let cart = JSON.parse(window.localStorage.cart);
      this.cartCount = cart.length;
      // console.log(this.cartCount);
    } else {
      this.cartCount = 0;
    }
    this.cdRef.detectChanges();
  }

  logout() {
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  search(): void {
    const dialogRef = this.dialog.open(SearchResultDialogComponent, {
      width: '90%',
      data: { name: 'Divesh Panwar' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'app-search-diaog',
  templateUrl: 'search-result.dialog.component.html'
})
export class SearchResultDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SearchResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}