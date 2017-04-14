///<reference path="../../../node_modules/@angular/core/src/facade/async.d.ts"/>
import {EventEmitter, Inject, Injectable, Output} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { APP_CONFIG, AppConfig } from '../app.config';
import { AppService } from './app.service';
import * as io from 'socket.io-client';


@Injectable()
export class SocketService {
  private name: string;
  socket: SocketIOClient.Socket;
  constructor(@Inject(APP_CONFIG) private config: AppConfig, private appService: AppService) {
    const socketUrl = 'http://localhost:3000';
    this.socket = io.connect(socketUrl);
  }

  // Get items observable
  get(): Observable<any> {
    this.socket.on('connect', () => this.connect());
    this.socket.on('disconnect', () => this.disconnect());
    this.socket.on('error', (error: string) => {
      console.log(`ERROR: "${error}"`);
    });

    // Return observable which follows "notification" and "order checkout" signals from socket stream
    return new Observable((observer: any) => {
      this.socket.on('refresh notifications', (notification: any) => observer.next({type: 'notification', data: notification}) );
      this.socket.on('order checkout', (checkout: any) => observer.next({type: 'checkout', data: checkout}) );
      // return () => this.socket.close();
    });
  }

  see(id: any) {
    console.log(id);
    this.socket.emit('see notification', id);
  }
  checkout(order: any) {
    this.socket.emit('checkout', order);
  }
  notify(notification: string) {
    this.socket.emit('new notification', notification);
  }

  // Handle connection opening
  private connect() {
    console.log(`Connected to localhost:3000`);

    // Request initial list when connected
    this.socket.emit('login', this.appService.user);
  }

  // Handle connection closing
  private disconnect() {
    console.log(`Disconnected from "${this.name}"`);
    this.socket.emit('logout', this.appService.user);
  }
}
