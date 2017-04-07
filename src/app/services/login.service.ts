import {Injectable, Inject} from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { Headers, Http, Response } from '@angular/http';

@Injectable()
export class LoginService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: Http) {
    console.log(config.apiEndpoint);
  }

  authLogin(user){
    const body = JSON.stringify(user);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.config.apiEndpoint+'login', body, {headers: headers});
  }

}
