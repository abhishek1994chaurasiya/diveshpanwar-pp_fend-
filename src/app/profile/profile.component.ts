import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../alert/alert.component';
import { AddressService } from '../services/address.service';
import { CardService } from '../services/card.service';
import {
  Validators,
  AbstractControl,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { AuthService } from '../services/auth.service';

declare const $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId = null;
  profileData: any;
  addresses = [];
  cards = [];
  recommendations = [];
  signupForm: FormGroup;
  invalidPassword = false;
  editProfileData = false;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private addressService: AddressService,
    private cardService: CardService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.profileData = null;
    this.addresses = [];
    this.cards = [];
    this.recommendations = [];
    this.userId = window.sessionStorage.getItem('user_id');
    console.log(this.userId);
    this.signupForm = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.pattern('^[A-Za-z][A-Za-z, ]{1,}[A-Za-z]$')
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        password: ['', [Validators.required]],
        userId: ['', Validators.required]
      },
      {
        validator: this.validatePassword
      }
    );

    if (this.userId) {
      this.profileService.fetchProfileData(this.userId).subscribe(
        res => {
          this.profileData = res.json();
          this.signupForm.patchValue(this.profileData);
          this.signupForm.patchValue({
            userId: this.userId
          });
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

      this.profileService.fetchRecommendations(this.userId).subscribe(
        res => {
          const dataArray = res.json();
          let newData = [];
          let addedIds = [];
          if (dataArray.length > 0) {
            dataArray.forEach(element => {
              if (addedIds.indexOf(element.productId) == -1) {
                addedIds.push(element.productId);
                newData.push(element);
              }
            });
            this.recommendations = newData;
          } else {
            this.recommendations = [];
          }
        }, err => {
          console.log(err.json());
        }
      );

    }
  }

  validatePassword(c: AbstractControl): { invalid: Boolean } {
    const pass = c.get('password').value;
    const passMatch = pass.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    );
    if (!passMatch) {
      return { invalid: true };
    }
  }

  showProduct(productId) {
    this.router.navigate(['/product', productId]);
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

  toggleInvalidPassword() {
    const pass = this.signupForm.get('password').value;
    const passMatch = pass.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    );

    if (passMatch) {
      this.invalidPassword = false;
    } else {
      this.invalidPassword = true;
    }
    this.cdRef.detectChanges();
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

  editProfile() {
    this.authService.editProfile(this.signupForm.value).subscribe(
      res => {
        console.log(res);
        const dialogRef = this.dialog.open(AlertComponent, {
          width: '50%',
          data: {
            type: 'success',
            message:  `Profile Updated`
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.editProfileData = false;
          this.ngOnInit();
        });

      },
      error => {
        // console.log(error.error.message);
        console.log(error);
        const dialogRef = this.dialog.open(AlertComponent, {
          width: '50%',
          data: {
            type: 'danger',
            message:  error.error.message ? error.error.message : `Something went wrong. Please try again`
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }
    );
  }

  toggleProfileEditor() {
    this.editProfileData = !this.editProfileData;
  }

  cancel() {
    this.editProfileData = false;
    this.signupForm.patchValue(this.profileData);
    this.cdRef.detectChanges();
  }
}
