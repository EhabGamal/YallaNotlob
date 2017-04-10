import { Component, OnInit,EventEmitter } from '@angular/core';
import { OrdersService } from '../services/orders.service'
import { AppService } from '../services/app.service'
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [ OrdersService ]
})
export class OrdersComponent implements OnInit {
   public orders: any = {};
 
  constructor(private appService: AppService, private ordersService: OrdersService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(){
     this.ordersService.getOrders(this.appService.user._id).subscribe(
       (data: any) => { this.orders = data; console.log(this.orders); },
      (error: any) => { },
      () => { }
    );
     console.log("orders",this.orders)
  }

   finishOrder(event:any){
    var target = event.target ;
    var idAttr = target.attributes.id;
    var order_id = idAttr.nodeValue;
    this.ordersService.finishOrder(order_id).subscribe(
    (data: any) => { this.getOrders(); console.log(this.orders); },
      (error: any) => { },
      () => { }
     );
   }    
  
}
