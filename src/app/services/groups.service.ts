import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../app.config';
import { Headers, Http, Response } from '@angular/http';
import { AppService } from '../services/app.service'
import 'rxjs/Rx';

@Injectable()
export class GroupsService {

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: Http, private appService: AppService) {
    console.log(config.apiEndpoint);
  }

  getAll(id: string){
    const headers = new Headers({ 'Authorization': this.appService.token});
    console.log(this.appService.token);
    return this.http.get(this.config.apiEndpoint+'users/'+id+'/groups',{headers: headers})
      .map((response: Response) => response.json());
  }
  addGroup(name: string){
    const body = JSON.stringify({name:name});
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization': this.appService.token});
    console.log(this.appService.token);
    return this.http.post(this.config.apiEndpoint+'groups',body,{headers: headers})
      .map((response: Response) => response.json());
  }
  addMember(gid: string ,uid: string){
    const body = JSON.stringify({user:uid});
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization': this.appService.token});
    console.log(this.appService.token);
    return this.http.post(this.config.apiEndpoint+'groups/gid/add_member',body,{headers: headers})
      .map((response: Response) => response.json());
  }
}
