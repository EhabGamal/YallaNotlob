import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../app.config';
import { Headers, Http, Response } from '@angular/http';
import { AppService } from './app.service'
import * as io from 'socket.io-client';
import 'rxjs/Rx';

@Injectable()
export class NotificationsService {

  private socket;

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: Http, private appService: AppService) {
    this.socket = io(this.config.apiEndpoint+'/');
  }

  login(){
    this.socket.emit('login', this.appService.user);
  }

}
