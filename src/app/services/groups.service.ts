import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../app.config';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class GroupsService {

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: Http) {
    console.log(config.apiEndpoint);
  }

  getAll(id){
    const body = JSON.stringify(user);
    return this.http.get(this.config.apiEndpoint+'user/'+id+'/groups')
      .map((response: Response) => response.json());
  }

}
