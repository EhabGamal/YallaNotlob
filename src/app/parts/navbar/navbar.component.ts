import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../../services/app.service';
import { SocketService } from '../../services/socket.service';
import { NotificationsService } from '../../services/notifications.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers: [ SocketService , NotificationsService]
})
export class NavbarComponent implements OnInit {

  user: any;
  private notifications: any = [];
  private checkoutData: any;
  private checkedOut: boolean;
  constructor(private appService: AppService, private socketService: SocketService, private notificationService: NotificationsService) { this.user = appService.user; }

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
}
