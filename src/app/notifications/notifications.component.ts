import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [ NotificationsService ]
})
export class NotificationsComponent implements OnInit, OnDestroy {

  private notifications: any = [{message:''}];
  private connection;
  private notification: any = {message:''};

  constructor( private notificationService: NotificationsService ) { }

  ngOnInit(): void {
    this.notificationService.login();
    this.connection = this.notificationService.getNotifications().subscribe( notification => {
      this.notifications.push(notification);
      console.log('new notification');
    });
  }

  ngOnDestroy(): void {
    this.connection.unsubscribe();
  }

  sendNotification(){
    this.notificationService.sendNotification(this.notification);
    this.notification = '';
  }

}
