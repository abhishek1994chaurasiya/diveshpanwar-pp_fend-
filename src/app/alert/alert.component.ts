import {
  Component,
  Inject,
  ChangeDetectorRef
} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    console.log('I am clicked');
    this.dialogRef.close();
  }
}
