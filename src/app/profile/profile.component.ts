import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../alert/alert.component';

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
  constructor(
    private profileService: ProfileService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.profileData = null;
    this.addresses = [];
    this.cards = [];
    this.userId = window.sessionStorage.getItem('user_id');
    console.log(this.userId);
    if (this.userId) {
      this.profileService.fetchProfileData(this.userId).subscribe(
        res => {
          console.log(res.json());
          this.profileData = res.json();
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
          console.log(res.json());
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
          console.log(res.json());
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
    }
  }

  editAddress(addressId) {
    this.router.navigate(['/editAddress', addressId]);
  }

  editCard(cardId) {
    this.router.navigate(['/editCard', cardId]);
  }

  deleteAddress(addressId) {

  }

  deleteCard(cardId) {

  }

  editProfile() {

  }

}
