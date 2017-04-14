import {Component, EventEmitter, ViewChild, OnInit} from '@angular/core';
import { AppService } from '../services/app.service';
import { FriendsService } from '../services/friends.service';
import { OrdersService } from '../services/orders.service'
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ FriendsService ,OrdersService]
})
export class HomeComponent implements OnInit {

  @ViewChild('modal') modal;
  modalMsg = {msg:"Testing again", icon:'person', warning:true};
  private profileModalActions = new EventEmitter<string|MaterializeAction>();
  private friendsActivities: any = [];
  private activities: any = [];
  private latestActivities: any = [];
  private profile: any = this.appService.user;
  private newProfile = this.profile;
  private latestorders :any =[];

  constructor(private appService: AppService ,private friendsService: FriendsService , private ordersService: OrdersService) { }

  ngOnInit() {
    this.FriendsActivities();
    this.latestOrders();
  }

  editProfile(){
    this.profileModalActions.emit({action:"modal",params:['open']});
  }

  saveProfile(){

  }

  closeProfileModal(){
    this.profileModalActions.emit({action:"modal",params:['close']});
  }

  resetProfile(){
    this.newProfile = this.profile;
  }

  FriendsActivities(){
    this.friendsService.friendsActivities(this.appService.user._id).subscribe(
      (data: any) => { this.friendsActivities = data; console.log(this.friendsActivities);console.log(this.friendsActivities[0].activities.pop().message);  },
      (error: any) => { },
      () => { }
    );
  }
//   for(let item of this.friendsActivities) {
//     console.log(item); // 0,1,2
// }

  latestOrders(){
    this.ordersService.latestOrders(this.appService.user._id).subscribe(
       (data: any) => { this.latestorders = data; console.log(" lateset orders are :",this.latestorders);  },
      (error: any) => { },
      () => { }
    );

  }

}
