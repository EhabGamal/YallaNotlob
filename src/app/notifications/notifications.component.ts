import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from '../services/socket.service';
import {NotificationsService} from '../services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [ SocketService ]
})
export class NotificationsComponent implements OnInit, OnDestroy {

  private notifications: any = [];
  private connection;
  private notification: any = {to: '58e81de8639dbf5998125e64', link: 'salama.com', message: 'salamadssdsdsdsd', type: 'invitation'};

  constructor( private socketService: SocketService ) { }

  ngOnInit(): void {
    this.connection = this.socketService.get().subscribe((data) => {
      if (data.type === 'notification') {
        this.notifications.push(data.data);
      }
        if (data.type === 'checkout') {
          this.notifications.push(data.data);
        }

      console.log(data);
    },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy(): void {
    this.connection.unsubscribe();
  }

  sendNotification() {
    this.socketService.notify(this.notification);
    this.notification = '';
  }

}
