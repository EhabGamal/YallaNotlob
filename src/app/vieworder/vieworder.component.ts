import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AppService } from '../services/app.service';
import { ProvidersService } from '../services/providers.service';
import { OrdersService } from '../services/orders.service';
import { FriendsService } from '../services/friends.service';

@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.component.html',
  styleUrls: ['./vieworder.component.css'],
  providers: [ ProvidersService, OrdersService, FriendsService ]
})
export class VieworderComponent implements OnInit {

  private loading: number = 1;
  private orderID: string = '';
  private order: any = {id:1,name:'Breakfast Order'};
  private availableItems: any = [];
  private myFriends: any = [];
  private orderItems: any = [];
  private myItems: any = [];
  private newItem: any = {
    item:'',
    amount:0,
    comment:''
  };
  private itemPrice: number = 0;
  private total: number = 0;

  constructor( private router: ActivatedRoute, private appService: AppService, private ordersService: OrdersService, private providersService: ProvidersService, private friendsService: FriendsService ) { }

  ngOnInit() {
    this.router.params.subscribe(
      (params) => { console.log(params['id']); this.orderID = params['id']; this.getOrder(); this.loading--; }
    )
  }

  getOrder(){
    this.ordersService.getOrder(this.orderID).subscribe(
      (data) => { console.log(data); this.order = data; console.log(this.order); this.getAvailableItems(); this.getFriends(); },
      (error) => { console.log(error); }
    )
  }

  getAvailableItems(){
    this.providersService.getItems(this.order.provider).subscribe(
      (data) => { console.log(data); this.availableItems = data; this.setItemPrice(); },
      (error) => { console.log(error); }
    );
  }

  getFriends(){
    this.friendsService.getAll(this.appService.user._id).subscribe(
      (data) => { console.log(data); this.myFriends = data; this.myFriends.push(this.appService.user); this.setOwnerName(); },
      (error) => { console.log(error); }
    );
  }

  changeItem(item){
    this.newItem.item = item;
    console.log(this.newItem);
  }

  addItem(id: string){
    console.log(this.newItem);
    if(this.newItem.item != ''){
      if(this.newItem.amount < 0){
        this.ordersService.addItem(this.orderID, this.newItem).subscribe(
          (data) => {console.log(data); this.getOrder();},
          (error) => {console.log(error)}
        )
      }else
        console.log(this.newItem.amount)
    }else
      console.log('empty item name')
  }

  removeItem(id: string){

  }

  setItemPrice(){
    //return this.availableItems.filter((item) => item._id == id).map((item) => item.price)
    this.order.items.map((item) => {
      this.availableItems.filter((available) => available._id == item.item).map((available) => { item.price = available.price; item.name = available.name;});
    })
  };

  setOwnerName(){
    console.log(this.myFriends);
    this.order.items.map((item) => {
      item.ownerName = this.myFriends.filter((friend) => friend._id == item.orderBy).map((friend) => { console.log('friend');console.log(friend); return friend.firstName;});
    })
  }

  calcItemPrice(){
    this.itemPrice = this.newItem.amount * this.availableItems.filter((item) => item._id == this.newItem.item).map((item) => item.price);
    this.calcTotal();
  }

  calcTotal(){
    this.total = this.itemPrice;
    this.order.items.filter((item) => item.orderBy == this.appService.user._id).map((item) => { this.total += item.price * item.amount; })
  }

}
