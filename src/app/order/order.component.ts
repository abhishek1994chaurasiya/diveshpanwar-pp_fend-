import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AlertComponent } from '../alert/alert.component';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataDialogComponent } from '../data-dialog/data-dialog.component';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[];
  userId = null;
  order = null;
  filterForm: FormGroup;
  dateToday = new Date();
  constructor(
    private orderService: OrderService,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      userId: null,
      filter: ''
    });
    this.userId = window.sessionStorage.getItem('user_id');
    this.notificationService.getUnreadNotifications(this.userId).subscribe(
      notifications => {
        window.localStorage.notifications = JSON.stringify(notifications.json());
      }, err => {
        console.log(err);
      }
    );
    this.orderService.getOrders(this.userId).subscribe(
      res => {
        this.orders = res.json();
        this.filterForm.patchValue({
          userId: this.userId
        });
        console.log(this.orders);
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

  changeOrderStatus(order) {
    if (order.orderStatus === 'open') {
      order.orderStatus = 'cancelled';
    } else if (order.orderStatus === 'delivered') {
      order.orderStatus = 'returned';
    }
    this.orderService.updateOrder(order).subscribe(
      res => {
        console.log(res.json());
        const dialogRef = this.dialog.open(AlertComponent, {
          width: '50%',
          data: {
            type: 'success',
            message: `Order Updated Successfuly`
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

  getOrderDetail(orderId) {
    this.order = null;
    this.notificationService.getOrderDetail(orderId).subscribe(
      res => {
        this.order = res.json();
        this.order.products.forEach(prod => {
          console.log(prod.displayName);
        });
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


  filterProducts() {
    console.log(this.filterForm.value);
    if (this.filterForm.get('filter').value == '') {
      this.ngOnInit();
    } else {
      this.orderService.filterOrder(this.filterForm.value).subscribe(
        res => {
          console.log(res.json());
          this.orders = res.json();
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
