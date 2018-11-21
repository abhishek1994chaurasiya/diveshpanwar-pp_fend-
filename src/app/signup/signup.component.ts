import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  mailSent = false;
  response = false;
  invalidPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private authService: AuthService,
    private cdref: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group(
      {
        username: [
          '',
          [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z, ]{1,}[A-Za-z]$')]
        ],
        email: ['', [Validators.required, Validators.email]],
        contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        password: ['', [Validators.required]],
        confirmPass: ['', [Validators.required]]
      },
      {
        validator: this.validatePassword
      }
    );
  }

  signup() {
    this.authService.signup(this.signupForm.value).subscribe(
      res => {
        // this.response = res.status;
        this.response = true;
        // console.log(res);
        const dialogRef = this.dialog.open(MessageSentDialogComponent, {
          width: '250px',
          data: { response: this.response }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.response = false;
        });
        // this.signupForm.reset();
        setTimeout(() => {
          this.response = false;
          this.router.navigate(['/login']);
        }, 3000);

      },
      error => {
        // console.log(error.error.message);
        const message = error.error.message;
        const dialogRef = this.dialog.open(MessageSentDialogComponent, {
          width: '250px',
          data: { response: this.response, message: message}
        });

        dialogRef.afterClosed().subscribe(result => {
          this.response = false;
        });
      }
    );
  }

  validatePassword(c: AbstractControl): { invalid: Boolean } {
    if (c.get('password').value !== c.get('confirmPass').value) {
      return { invalid: true };
    }
    const pass = c.get('password').value;
    const passMatch = pass.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    );
    if (!passMatch) {
      return { invalid: true };
    }
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
    this.cdref.detectChanges();
  }
}

@Component({
  selector: 'app-signup-dialog',
  templateUrl: 'signup-dialog-component.html',
  styleUrls: ['signup-dialog-component.css']
})
export class MessageSentDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
    this.data.response = false;
  }
}
