import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../app.config';
import { Headers, Http, Response } from '@angular/http';
import { AppService } from '../services/app.service'
import 'rxjs/Rx';

@Injectable()
export class ProvidersService {

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: Http, private appService: AppService) { }

  getAll(){
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization': this.appService.token});
    return this.http.get(this.config.apiEndpoint+'providers/',{headers: headers})
      .map((response: Response) => response.json());
  }

  getItems(id: string){
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization': this.appService.token});
    return this.http.get(this.config.apiEndpoint+'providers/'+id+'/items',{headers: headers})
      .map((response: Response) => response.json());
  }

}
