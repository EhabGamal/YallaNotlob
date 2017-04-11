import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../services/groups.service'
import { FriendsService } from '../services/friends.service'
import { ProvidersService } from '../services/providers.service'
import { AppService } from '../services/app.service'

@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.css'],
  providers: [ GroupsService, FriendsService, ProvidersService ]
})
export class AddorderComponent implements OnInit {

  public myGroups: any = {};
  public myFriends: any = [];
  public invitedGroups: any = {owned:[],joined:[]};
  public invitedFriends: any = [];
  public providers: any = [];
  public providerValue: any;
  private loading: boolean = false;
  public mealsOptions: any = [
    { name:'Breakfast', value:'breakfast'},
    { name:'Lunch', value:'lunch'},
    { name:'Dinner', value:'dinner'}
  ];
  public mealValue: any;

  public email: string = '';

  constructor(private appService: AppService, private groupsService: GroupsService, private friendsService: FriendsService, private providersService: ProvidersService) { }

  ngOnInit() {
    this.loadMyGroups();
    this.loadMyFriends();
    this.loadProviders();
  }

  changeMeal(newValue) {
    this.mealValue = newValue;
  }

  changeProvider(newValue) {
    this.providerValue = newValue;
  }

  loadMyGroups(){
    this.loading = true;
    this.groupsService.getAll(this.appService.user._id).subscribe(
      (data: any) => { this.myGroups = data; console.log(this.myGroups.owned); },
      (error: any) => { this.loading = false; },
      () => { this.loading = false; console.log('loading groups completed'); }
    );
  }

  loadMyFriends(){
    this.loading = true;
    this.friendsService.getAll(this.appService.user._id).subscribe(
      (data: any) => { this.myFriends = data; console.log(this.myFriends); },
      (error: any) => { this.loading = false; },
      () => { this.loading = false; console.log('loading friends completed'); }
    );
  }

  loadProviders(){
    this.loading = true;
    this.providersService.getAll().subscribe(
      (data: any) => { this.providers = data; console.log(this.providers); },
      (error: any) => { this.loading = false; },
      () => { this.loading = false; }
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
    this.invitedFriends.push(friend);
    this.myFriends.splice(this.myFriends.indexOf(friend),1);
  }

  removeFriend(friend: any){
    this.myFriends.push(friend);
    this.invitedFriends.splice(this.invitedFriends.indexOf(friend),1);
  }

  publishOrder(){
    let members: any = [];
    for(let type in this.invitedGroups){
      this.invitedGroups[type].forEach((group) => {
        group.members.forEach((friend) => { if(members.indexOf(friend.email)==-1) members.push(friend.email); })
      });
    }
    this.invitedFriends.forEach((friend) => {
      if(members.indexOf(friend.email)==-1) members.push(friend.email);
    });
    console.log(members);
  }

}
