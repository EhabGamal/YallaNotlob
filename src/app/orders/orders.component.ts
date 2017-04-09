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

  constructor(private appService: AppService, private groupsService: OrdersService) { }

  ngOnInit() {
    
  }

}
