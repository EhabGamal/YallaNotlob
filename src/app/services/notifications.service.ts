import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../app.config';
import { Headers, Http, Response } from '@angular/http';
import { AppService } from './app.service';

import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NotificationsService {

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: Http, private appService: AppService) {

  }

  getAll() {
    const headers = new Headers({ 'Authorization': this.appService.token});
    return this.http.get(this.config.apiEndpoint + 'users/' + this.appService.user._id + '/notifications', {headers: headers})
      .map((response: Response) => response.json())
      .filter((notification) => {
       return notification.filter((n) => {
         return !n.seen;
       });
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); ;
  }

}
