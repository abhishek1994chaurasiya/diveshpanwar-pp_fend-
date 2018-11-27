import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddressService } from '../services/address.service';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
  addressForm: FormGroup;
  validatePassword: any;
  userId = null;
  error = null;
  addressId: null;
  addressData: any;
  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private cdRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(param => {
      console.log(param);
      this.addressId = param.addressId;
    });
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
      address: ['', [Validators.required]],
      addressId: ['', [Validators.required]]
    });

    this.userId = window.sessionStorage.getItem('user_id');
    this.addressForm.patchValue({
      userId: this.userId,
      addressId: this.addressId
    });
    this.addressService.fetchAddress(this.addressId).subscribe(
      res => {
        ;
        this.addressData = res.json();
        this.addressForm.patchValue(this.addressData);
        this.cdRef.detectChanges();
      },
      err => {
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

  add() {
    this.error = null;
    this.addressService.editAddress(this.addressForm.value).subscribe(
      res => {
        ;
        const dialogRef = this.dialog.open(AlertComponent, {
          width: '50%',
          data: {
            type: 'success',
            message: `Address Modified Successfuly`
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.router.navigate(['/profile']);
        });
      },
      err => {
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

  cancel() {
    this.router.navigate(['/profile']);
  }
}
