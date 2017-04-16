import {Component, OnInit, EventEmitter, ViewChild} from '@angular/core';
import { OrdersService } from '../services/orders.service'
import { FriendsService } from '../services/friends.service'
import { AppService } from '../services/app.service'
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [ OrdersService, FriendsService ]
})
export class OrdersComponent implements OnInit {

  @ViewChild('msgModal') modal;
  private response: any = {
    msg: '',
    icon: 'info',
    color: ''
  };
  private loading: number = 0;

  public orders: any = {};
  public friends: any = [];

  constructor(private appService: AppService, private ordersService: OrdersService, private friendsService: FriendsService) { }

  ngOnInit() {
    this.getFriends();
  }

  getOrders(){
    this.loading++;
    this.ordersService.getOrders(this.appService.user._id).subscribe(
      (data: any) => {
        this.orders = data;
        this.loading--;
        console.log(this.orders);
      },
      (error: any) => {
        this.loading--;
      }
    );
  }

  getFriends(){
    this.loading++;
    this.friendsService.getAllOthers().subscribe(
      (data) => {
        this.friends = data;
        this.loading--;
        console.log(this.friends);
        //this.friends.push(this.appService.user);
        this.getOrders();
      },
      (error) => {
        console.log(error);
        this.loading--;
      }
    )
  }

  getFriendName(id){
    return this.friends.filter((friend) => {
      return friend._id == id;
    }).map((friend) => friend.firstName)
  }

  deleteOrder(id){
    this.loading++;
    this.ordersService.deleteOrder(id).subscribe(
      (data) => {
        this.loading--;
        this.getFriends();
        this.setModalMsg(data.message,1);
        this.showModal();
      },
      (error) => {
        this.loading--;
        this.setModalMsg(error.json().message,0);
      }
    )
  }

  leaveOrder(id){
    this.loading++;
    this.ordersService.leaveOrder(id).subscribe(
      (data) => {
        this.loading--;
        this.getFriends();
        this.setModalMsg(data.message,1);
        this.showModal();
      },
      (error) => {
        this.loading--;
        this.setModalMsg(error.json().message,0);
      }
    )
  }

  setModalMsg(msg: string, state: number) {
    switch (state) {
      case 1:
        this.response = {msg: msg, icon: 'check', color: 'green-text'};
        break;
      case 2:
        this.response = {msg: msg, icon: 'warning', color: 'orange-text'};
        break;
      default:
      case 0:
        this.response = {msg: msg, icon: 'close', color: 'red-text'};
        break;
    }
    this.showModal();
  }

  showModal(){
    this.modal.modalActions.emit({action:"modal",params:['open']});
  }
}
