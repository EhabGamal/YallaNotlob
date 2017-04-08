import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../app.config';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class LoginService {

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: Http) {
    console.log(config.apiEndpoint);
  }

  authLogin(user: any){
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json'});
    return this.http.post(this.config.apiEndpoint+'login', body, {headers: headers})
      .map((response: Response) => response.json());
  }

}
