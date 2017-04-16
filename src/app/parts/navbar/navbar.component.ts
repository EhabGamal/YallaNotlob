import {Component, EventEmitter, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';
import { LoginService } from '../../services/login.service';
import {SocketService} from '../../services/socket.service';
import {NotificationsService} from '../../services/notifications.service';
import {MaterializeAction} from "angular2-materialize";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers: [ NotificationsService]
})
export class NavbarComponent implements OnInit {

  private checkoutModalActions = new EventEmitter<string|MaterializeAction>();
  private user: any;
  private notifications: any = [];
  private checkoutData: any = [];
  private checkedOut: boolean;
  constructor(private appService: AppService, private loginService: LoginService, private router: Router, private socketService: SocketService, private notificationService: NotificationsService) { this.user = appService.user; }

  ngOnInit(): void {
    this.notificationService.getAll().subscribe(
      notifications => this.notifications = notifications, //Bind to view
      err => {
        // Log errors if any
        console.log(err);
      });
    this.socketService.get().subscribe((data) => {
        if (data.type === 'notification') {
          this.notifications.push(data.data);
          console.log(data.data);
        }
        if (data.type === 'checkout') {
          this.checkedOut = true;
          this.checkoutData.push(data.data);
        }

        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  seeNotification(notificationId) {
    this.socketService.see(notificationId);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  openChekOutModal(){
    this.checkoutModalActions.emit({action:"modal",params:['open']});
  }

  closeCheckOutModal(){
    this.checkoutModalActions.emit({action:"modal",params:['close']});
  }

  getChekOutGrandTotal(){
    let grandTotal = 0;
    this.checkoutData.forEach((item) => grandTotal += item.total);
    return grandTotal;
  }

}
