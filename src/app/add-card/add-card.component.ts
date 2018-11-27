import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';
import {Moment} from 'moment';
import { CardService } from '../services/card.service';
import { Location } from '@angular/common';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class AddCardComponent implements OnInit {

  cardForm: FormGroup;
  validatePassword: any;
  userId = null;
  error = null;
  cards = [
    {value: 'credit', viewValue: 'Credit'},
    {value: 'debit', viewValue: 'Debit'},
    {value: 'forex', viewValue: 'Forex'}
  ];


  constructor(
    private formBuilder: FormBuilder,
    private cardService: CardService,
    private cdRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router,
    private location: Location

  ) {}

  ngOnInit() {
    this.cardForm = this.formBuilder.group({
      cardType: [
        'debit',
        [
          Validators.required,
        ]
      ],
      userId: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expiry: [moment(), [Validators.required]]
    });

    this.userId = window.sessionStorage.getItem('user_id');
    this.cardForm.patchValue({
      userId: this.userId
    });
  }
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.cardForm.get('expiry').value;
    ctrlValue.year(normalizedYear.year());
    this.cardForm.get('expiry').setValue(ctrlValue);
  }

  chosenMonthHandler(normlizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.cardForm.get('expiry').value;
    ctrlValue.month(normlizedMonth.month());
    this.cardForm.get('expiry').setValue(ctrlValue);
    datepicker.close();
  }
  add() {
    this.error = null;
    const expiryDate = this.cardForm.get('expiry').value;
    const newExpiryDate = expiryDate.year() + '-' + (Number(expiryDate.month()) + 1) + '-' + expiryDate.date();
    this.cardForm.patchValue({
      expiry: newExpiryDate
    });

    this.cardService.addCard(this.cardForm.value).subscribe(
      res => {
        ;
        const dialogRef = this.dialog.open(AlertComponent, {
          width: '50%',
          data: {
            type: 'success',
            message: `Card added.`
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
        this.cardForm.patchValue({
          expiry: expiryDate
        });
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
