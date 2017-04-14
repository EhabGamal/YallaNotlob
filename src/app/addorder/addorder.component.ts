import {Component, OnInit, ViewChild} from '@angular/core';
import { GroupsService } from '../services/groups.service'
import { ProvidersService } from '../services/providers.service'
import { AppService } from '../services/app.service'
import { FriendsService } from "../services/friends.service";
import { OrdersService } from "../services/orders.service";

@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.css'],
  providers: [ GroupsService, ProvidersService, FriendsService, OrdersService ]
})

export class AddorderComponent implements OnInit {

  @ViewChild('msgModal') modal;
  private response: any = {
    msg: '',
    icon: 'info',
    color: ''
  };
  private order: any = { name:'', 'for':'', provider:'', invited:'' };
  private email: string = '';
  private myGroups: any = {};
  private invitedGroups: any = {owned:[],joined:[]};
  private myFriends: any = [];
  private invitedFriends: any = [];
  private providers: any = [];
  private loading: number = 0;
  private mealsOptions: any = [
    { name:'Breakfast', value:'Breakfast'},
    { name:'Lunch', value:'Lunch'},
    { name:'Dinner', value:'Dinner'}
  ];

  constructor(private appService: AppService, private groupsService: GroupsService, private friendsService: FriendsService, private providersService: ProvidersService,  private ordersService: OrdersService) { }

  ngOnInit() {
    this.loadMyGroups();
    this.loadMyFriends();
    this.loadProviders();
  }

  changeMeal(newValue) {
    this.order['for'] = newValue;
  }

  changeProvider(newValue) {
    this.order.provider = newValue;
  }

  loadMyGroups(){
    this.loading++;
    this.groupsService.getAll(this.appService.user._id).subscribe(
      (data: any) => { this.myGroups = data; this.loading--; console.log(this.myGroups.owned); },
      (error: any) => { this.loading--; },
    );
  }

  loadMyFriends(){
    this.loading++;
    this.friendsService.getAll(this.appService.user._id).subscribe(
      (data: any) => { this.myFriends = data; this.loading--; console.log(this.myFriends); },
      (error: any) => { this.loading--; }
    );
  }

  loadProviders(){
    this.loading++;
    this.providersService.getAll().subscribe(
      (data: any) => { this.providers = data; this.loading--; console.log(this.providers); },
      (error: any) => { this.loading--; }
    );
  }

  inviteGroup(group: any, type: string){
    this.invitedGroups[type].push(group);
    this.myGroups[type].splice(this.myGroups[type].indexOf(group),1);
  }

  removeGroup(group: any, type: string){
    this.myGroups[type].push(group);
    this.invitedGroups[type].splice(this.invitedGroups[type].indexOf(group),1);
  }

  inviteFriend(friend: any){
    if(this.invitedFriends.indexOf(friend) == -1){
      this.invitedFriends.push(friend);
      this.myFriends.splice(this.myFriends.indexOf(friend),1);
    }
  }

  removeFriend(friend: any){
    if(this.myFriends.indexOf(friend) == -1)
      this.myFriends.push(friend);
    this.invitedFriends.splice(this.invitedFriends.indexOf(friend),1);
  }

  publishOrder(){
    let members: any = [];
    for(let type in this.invitedGroups){
      this.invitedGroups[type].forEach((group) => {
        group.members.forEach((friend) => { if(members.indexOf(friend._id)==-1) members.push(friend._id); })
      });
    }
    this.invitedFriends.forEach((friend) => {
      if(members.indexOf(friend._id)==-1) members.push(friend._id);
    });
    this.order.invited = members;
    this.saveOrder();
  }

  saveOrder(){
    if(this.order.name != ''){
      if(this.order['for'] != ''){
        if(this.order.provider != ''){
          if(this.order.invited.length != 0){
            console.log(this.order);
            this.loading++;
            this.ordersService.addOrder(this.order).subscribe(
              (data: any) => { console.log(data); this.loading--; this.setModalMsg('Order Added Successfully!',0); },
              (error: any) => { this.loading--; },
            );
          }else
            this.setModalMsg('You must invite at least one friend!',2);
        }else
          this.setModalMsg('Select Restaurant!',2);
      }else
        this.setModalMsg('Select Meal Type!',2);

    }else
      this.setModalMsg('You Must enter Order Note!',2);
  }

  setModalMsg(msg: string, state: number){
    switch (state){
      case 1:
        this.response = {msg:msg, icon:'check', color:'green-text'};
        break;
      case 2:
        this.response = {msg:msg, icon:'warning', color:'orange-text'};
        break;
      default:
      case 0:
        this.response = {msg:msg, icon:'close', color:'red-text'};
        break;
    }
    this.showModal();
  }

  showModal(){
    this.modal.modalActions.emit({action:"modal",params:['open']});
  }

}
