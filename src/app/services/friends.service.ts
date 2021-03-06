import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../app.config';
import { Headers, Http, Response } from '@angular/http';
import { AppService } from '../services/app.service'
import 'rxjs/Rx';

@Injectable()
export class FriendsService {

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: Http, private appService: AppService) { }

  getAll(id: string){
    const headers = new Headers({ 'Authorization': this.appService.token});
    return this.http.get(this.config.apiEndpoint+'users/'+id+'/friends',{headers: headers})
      .map((response: Response) => response.json());
  }
  getAllOthers(){
    const headers = new Headers({ 'Authorization': this.appService.token});
    return this.http.get(this.config.apiEndpoint+'users',{headers: headers})
      .map((response: Response) => response.json());
  }
  addFriend(email: string){
    const body = JSON.stringify({email:email});
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization': this.appService.token});
    return this.http.post(this.config.apiEndpoint+'users/add_friend',body,{headers: headers})
      .map((response: Response) => response.json());
  }
  unFriend(id: string){
    //const body = JSON.stringify({user:email});
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization': this.appService.token});
    return this.http.post(this.config.apiEndpoint+'users/'+id+'/unfriend',{},{headers: headers})
      .map((response: Response) => response.json());
  }

   friendsActivities(id: string){
    const headers = new Headers({ 'Authorization': this.appService.token});
    return this.http.get(this.config.apiEndpoint+'users/'+id+'/friends'+'/activities',{headers: headers})
      .map((response: Response) => response.json());
  }

  updateUserProfile(id: string, user: any){
    const body = JSON.stringify(user);
    console.log(body,id);
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization': this.appService.token});
    return this.http.put(this.config.apiEndpoint+'users/'+id+'',body,{headers: headers})
      .map((response: Response) => response.json());
  }

  getUserProfile(id: string){
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization': this.appService.token});
    return this.http.get(this.config.apiEndpoint+'users/'+id,{headers: headers})
      .map((response: Response) => response.json())
  }

}
