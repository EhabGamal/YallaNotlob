import { Injectable , Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../app.config';
import { Headers, Http, Response } from '@angular/http';
import { AppService } from '../services/app.service'
import 'rxjs/Rx';

@Injectable()
export class OrdersService {

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: Http, private appService: AppService) { }

 getOrders(id: string){
    const headers = new Headers({ 'Authorization': this.appService.token});
    return this.http.get(this.config.apiEndpoint+'/orders'+id,{headers: headers})
      .map((response: Response) => response.json());
  }

  addOrder(order: any){
    const body = JSON.stringify({order});
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization': this.appService.token});
    return this.http.post(this.config.apiEndpoint+'orders',body,{headers: headers})
      .map((response: Response) => response.json());
  }

   finishOrder(id: string){
    const body = JSON.stringify({id});
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization': this.appService.token});
    return this.http.post(this.config.apiEndpoint+'orders'+id,{headers: headers})
      .map((response: Response) => response.json());
  }

 cancelOrder(id: string){
    const body = JSON.stringify({id});
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization': this.appService.token});
    return this.http.post(this.config.apiEndpoint+'orders'+id,{headers: headers})
      .map((response: Response) => response.json());
  }

//need item route from service
   addItem(item: any){
    const body = JSON.stringify({item});
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization': this.appService.token});
    return this.http.post(this.config.apiEndpoint+'orders/',body,{headers: headers})
      .map((response: Response) => response.json());
  }

//need item delete route from service
   removeItem(id: string){
    const body = JSON.stringify({id});
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization': this.appService.token});
    return this.http.post(this.config.apiEndpoint+'orders/',{headers: headers})
      .map((response: Response) => response.json());
  }




}
