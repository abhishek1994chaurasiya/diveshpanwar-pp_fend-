import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AddressService } from '../services/address.service';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../alert/alert.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  addressForm: FormGroup;
  validatePassword: any;
  userId = null;
  error = null;

  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private cdRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router,
    private location: Location

  ) {}

  ngOnInit() {
    this.addressForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z][A-Za-z, ]{1,}[A-Za-z]$')
        ]
      ],
      userId: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', [Validators.required]]
    });

    this.userId = window.sessionStorage.getItem('user_id');
    this.addressForm.patchValue({
      userId: this.userId
    });
  }

  add() {
    this.error = null;
    this.addressService.addAddress(this.addressForm.value).subscribe(
      res => {
        const dialogRef = this.dialog.open(AlertComponent, {
          width: '50%',
          data: {
            type: 'success',
            message: `Address added.`
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          // this.router.navigate(['/profile']);
          this.location.back();
        });

      }, err => {
        console.log(err);
        this.error = 'Something Went Wrong';
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
