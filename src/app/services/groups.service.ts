import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../app.config';
import { Headers, Http, Response } from '@angular/http';
import { AppService } from '../services/app.service'
import 'rxjs/Rx';

@Injectable()
export class GroupsService {

constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: Http, private appService: AppService) { }

  getAll(id: string){
    const headers = new Headers({ 'Authorization': this.appService.token});
    return this.http.get(this.config.apiEndpoint+'users/'+id+'/groups',{headers: headers})
      .map((response: Response) => response.json());
  }
  addGroup(name: string){
    const body = JSON.stringify({name:name});
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization': this.appService.token});
    return this.http.post(this.config.apiEndpoint+'groups',body,{headers: headers})
      .map((response: Response) => response.json());
  }
  removeGroup(id: string){
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization': this.appService.token});
    return this.http.delete(this.config.apiEndpoint+'groups/'+id,{headers: headers})
      .map((response: Response) => response.json());
  }
  addMember(gid: string ,email: string){
    const body = JSON.stringify({email:email});
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization': this.appService.token});
    return this.http.post(this.config.apiEndpoint+'groups/'+gid+'/add_email',body,{headers: headers})
      .map((response: Response) => response.json());
  }
  removeMember(gid: string ,id: string){
    const body = JSON.stringify({user:id});
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization': this.appService.token});
    return this.http.post(this.config.apiEndpoint+'groups/'+gid+'/remove_member',body,{headers: headers})
      .map((response: Response) => response.json());
  }
}
