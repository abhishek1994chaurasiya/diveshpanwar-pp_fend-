import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../alert/alert.component';
import { DataDialogComponent } from '../data-dialog/data-dialog.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  userId = null;
  notifications: any;
  order: any;
  constructor(
    private notificationService: NotificationService,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userId = window.sessionStorage.getItem('user_id');
    this.notificationService.getNotifications(this.userId).subscribe(
      res => {
        console.log(res.json());
        this.notifications = res.json();
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

  getOrderDetail(orderId) {
    this.order = null;
    this.notificationService.getOrderDetail(orderId).subscribe(
      res => {
        this.order = res.json();
        const dialogRef = this.dialog.open(DataDialogComponent, {
          width: '80%',
          data: {
            order: this.order
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
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

  changeNotificationStatus(notification) {
    if (notification.status == 'unread') {
      notification.status = 'read';
      this.notificationService.updateNotification(notification).subscribe(
        res => {
          console.log(res.json());
          const dialogRef = this.dialog.open(AlertComponent, {
            width: '50%',
            data: {
              type: 'success',
              message: `Notification marked as Read`
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
  }
}
