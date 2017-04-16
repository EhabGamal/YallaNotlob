import {Component, EventEmitter, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';
import { LoginService } from '../../services/login.service';
import {SocketService} from '../../services/socket.service';
import {NotificationsService} from '../../services/notifications.service';
import {MaterializeAction} from 'angular2-materialize';
import {OrdersService} from '../../services/orders.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers: [ NotificationsService , OrdersService]
})
export class NavbarComponent implements OnInit {

  public checkoutModalActions = new EventEmitter<string|MaterializeAction>();
  public user: any;
  private notifications: any = [];
  private checkoutData: any = [];
  constructor(private appService: AppService,
              private loginService: LoginService,
              private router: Router,
              private socketService: SocketService,
              private notificationService: NotificationsService,
              private orderService: OrdersService
  ) { this.user = appService.user; }

  ngOnInit(): void {
    this.notificationService.getAll().subscribe(
      notifications => this.notifications = notifications,
      err => {
        // Log errors if any
        console.log(err);
      });
    this.socketService.get()
      .subscribe((data) => {
        if (data.type === 'notification') {
          this.notifications.push(data.data);
        }
        if (data.type === 'checkout') {
          this.openChekOutModal();
          this.checkoutData = data.data;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  seeNotification(notificationId, index) {
    this.socketService.see(notificationId);
    this.notifications.splice(index, 1);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']).catch((err) => console.log(err));
  }

  openChekOutModal() {
    this.checkoutModalActions.emit({action: 'modal', params: ['open']});
  }

  closeCheckOutModal() {
    this.checkoutModalActions.emit({action: 'modal', params: ['close']});
  }

  getChekOutGrandTotal() {
    let grandTotal = 0;
    this.checkoutData.forEach((item) => grandTotal += item.total);
    return grandTotal;
  }
  acceptInvitation(notification, index) {
    this.orderService.acceptInvitation(notification.link).subscribe((data) => console.log(data), (err) => console.log(err)); ;
    this.seeNotification(notification._id, index);
  }

  refuseInvitation(notification, index) {
    this.orderService.refuseInvitation(notification.link).subscribe((data) => console.log(data), (err) => console.log(err));
    this.seeNotification(notification._id, index);
  }

}
