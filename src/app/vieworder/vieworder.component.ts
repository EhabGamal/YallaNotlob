import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AppService } from '../services/app.service';
import { ProvidersService } from '../services/providers.service';
import { OrdersService } from '../services/orders.service';
import { FriendsService } from '../services/friends.service';
import { SocketService } from '../services/socket.service';
import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.component.html',
  styleUrls: ['./vieworder.component.css'],
  providers: [ ProvidersService, OrdersService, FriendsService ]
})
export class VieworderComponent implements OnInit {

  @ViewChild('msgModal') modal;
  private orderModalActions = new EventEmitter<string|MaterializeAction>();
  private response: any = {
    msg: '',
    icon: 'info',
    color: ''
  };
  private loading: number = 1;
  private user: any = {};

  private orderID: string = '';
  private order: any = {id: 1, name: 'Breakfast Order'};
  private availableItems: any = [];
  private myFriends: any = [];
  private orderItems: any = [];
  private myItems: any = [];
  private newItem: any = {
    item: '',
    amount: 0,
    comment: ''
  };
  private itemPrice: number = 0;
  private total: number = 0;
  private receipt: any = {};
  private customers: any = [];

  constructor(
    private router: ActivatedRoute,
    private appService: AppService,
    private socketService: SocketService,
    private ordersService: OrdersService,
    private providersService: ProvidersService,
    private friendsService: FriendsService ) {
    this.user = this.appService.user;
  }

  ngOnInit() {
    this.router.params.subscribe(
      (params) => { console.log(params['id']); this.orderID = params['id']; this.getOrder(); this.loading--; }
    );
  }

  getOrder(){
    this.loading++;
    this.ordersService.getOrder(this.orderID).subscribe(
      (data) => {
        console.log(data);
        this.order = data;
        console.log(this.order);
        this.getAvailableItems();
        this.getFriends();
        this.loading--;
      },
      (error) => {
        console.log(error);
        this.loading--;
      }
    );
  }

  getAvailableItems(){
    this.loading++;
    this.providersService.getItems(this.order.provider).subscribe(
      (data) => {
        console.log(data);
        this.availableItems = data;
        this.setItemPrice();
        this.loading--;
      },
      (error) => {
        console.log(error);
        this.loading--;
      }
    );
  }

  getFriends(){
    this.loading++;
    this.friendsService.getAllOthers().subscribe(
      (data) => {
        console.log(data);
        this.myFriends = data;
        this.setOwnerName();
        this.loading--;
      },
      (error) => {
        console.log(error);
        this.loading--;
      }
    );
  }

  changeItem(item){
    this.newItem.item = item;
    console.log(this.newItem);
  }

  addItem(id: string){
    console.log(this.newItem);
    if (this.newItem.item != ''){
      if (this.newItem.amount > 0){
        this.loading++;
        this.ordersService.addItem(this.orderID, this.newItem).subscribe(
          (data) => {
            console.log(data);
            this.getOrder();
            this.resetNewItem();
            this.loading--;
            this.setModalMsg(data.message, 1);
            this.showModal();
          },
          (error) => {
            console.log(error);
            this.loading--;
            this.setModalMsg(error.json().message, 0);
          }
        );
      }else
        this.setModalMsg('Amount Cannot be ZERO!', 2);
    }else
      this.setModalMsg('Select Item to Add', 2);
  }

  removeItem(id: string){
    this.loading++;
    this.ordersService.removeItem(this.orderID, id).subscribe(
      (data) => {
        this.getOrder();
        this.loading--;
        this.setModalMsg(data.message, 1);
        this.showModal();
      },
      (error) => {
        console.log(error);
        this.loading--;
        this.setModalMsg(error.json().message, 0);
      }
    );
  }

  setItemPrice(){
    this.order.items.map((item) => {
      this.availableItems.filter((available) => available._id == item.item).map((available) => { item.price = available.price; item.name = available.name; });
    });
    this.calcTotal();
  };

  setOwnerName(){
    console.log(this.myFriends);
    this.order.items.map((item) => {
      item.ownerName = this.myFriends.filter((friend) => friend._id == item.orderBy).map((friend) => { console.log('friend'); console.log(friend); return friend.firstName; });
    });
  }

  getCustomerTotal(id: string){
    let customerTotal = 0;
    this.order.items.filter((item) => item.orderBy == id).map((item) => { customerTotal += item.price * item.amount; });
    return customerTotal;
  }

  getCustomerName(id: string){
    return this.myFriends.filter((friend) => friend._id == id).map((friend) => friend.firstName + ' ' + friend.lastName);
  }

  resetNewItem(){
    this.newItem = {
      item: '',
      amount: 0,
      comment: ''
    };
    this.calcItemPrice();
  }

  calcItemPrice(){
    this.itemPrice = this.newItem.amount * this.availableItems.filter((item) => item._id == this.newItem.item).map((item) => item.price);
    this.calcTotal();
  }

  calcTotal(){
    this.total = this.itemPrice;
    this.order.items.filter((item) => item.orderBy == this.appService.user._id).map((item) => { this.total += item.price * item.amount; });
  }

  checkout(){
    this.ordersService.finishOrder(this.orderID).subscribe(
      (data) => {
        console.log(data);
        this.receipt = data;
        this.customers = Object.keys(this.receipt);
        this.openCheckOutModal();
        this.socketService.checkout({id: this.orderID});
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getChekOutGrandTotal(){
    let grandTotal = 0;
    for (const customer in this.receipt)
      this.receipt[customer].forEach((item) => grandTotal += item.total);
    return grandTotal;
  }

  openCheckOutModal(){
    this.orderModalActions.emit({action: 'modal', params: ['open']});
  }

  closeCheckOutModal(){
    this.orderModalActions.emit({action: 'modal', params: ['close']});
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
    this.modal.modalActions.emit({action: 'modal', params: ['open']});
  }

}
