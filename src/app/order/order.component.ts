import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AlertComponent } from '../alert/alert.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[];
  userId = null;

  constructor(
    private orderService: OrderService,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userId = window.sessionStorage.getItem('user_id');
    this.orderService.getOrders(this.userId).subscribe(
      res => {
        this.orders = res.json();
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
}
