import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { CardService } from '../services/card.service';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY'
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class EditCardComponent implements OnInit {
  cardForm: FormGroup;
  validatePassword: any;
  userId = null;
  error = null;
  cards = [
    { value: 'credit', viewValue: 'Credit' },
    { value: 'debit', viewValue: 'Debit' },
    { value: 'forex', viewValue: 'Forex' }
  ];

  cardData: any;
  cardId = null;

  constructor(
    private formBuilder: FormBuilder,
    private cardService: CardService,
    private cdRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(param => {
      console.log(param);
      this.cardId = param.cardId;
    });

    this.cardForm = this.formBuilder.group({
      cardType: ['debit', [Validators.required]],
      userId: ['', [Validators.required]],
      cardId: ['', [Validators.required]],
      cardNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{16}$')]
      ],
      expiry: [moment(), [Validators.required]]
    });

    this.userId = window.sessionStorage.getItem('user_id');
    this.cardForm.patchValue({
      userId: this.userId,
      cardId: this.cardId
    });

    this.cardService.fetchCard(this.cardId).subscribe(
      res => {
        ;
        this.cardData = res.json();
        this.cardForm.patchValue(this.cardData);
        let expiryDate = this.cardData.expiry.split('-');
        expiryDate[1] = Number(expiryDate[1]) - 1;
        let newDate = expiryDate.join('-');
        this.cardForm.patchValue({
          expiry: moment(newDate)
        });

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

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.cardForm.get('expiry').value;
    ctrlValue.year(normalizedYear.year());
    this.cardForm.get('expiry').setValue(ctrlValue);
  }

  chosenMonthHandler(
    normlizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.cardForm.get('expiry').value;
    ctrlValue.month(normlizedMonth.month());
    this.cardForm.get('expiry').setValue(ctrlValue);
    datepicker.close();
  }

  add() {
    this.error = null;
    const expiryDate = this.cardForm.get('expiry').value;
    const newExpiryDate =
      expiryDate.year() +
      '-' +
      (Number(expiryDate.month()) + 1) +
      '-' +
      expiryDate.date();
    this.cardForm.patchValue({
      expiry: newExpiryDate
    });

    this.cardService.editCard(this.cardForm.value).subscribe(
      res => {
        ;
        const dialogRef = this.dialog.open(AlertComponent, {
          width: '50%',
          data: {
            type: 'success',
            message: `Card Edited Successfully`
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

  close() {
    this.router.navigate(['/profile']);
  }
}
