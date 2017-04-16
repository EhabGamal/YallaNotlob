import {Component, EventEmitter, ViewChild, OnInit} from '@angular/core';
import { AppService } from '../services/app.service';
import { LoginService } from '../services/login.service';
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

  @ViewChild('msgModal') modal;
  private response: any = {
    msg: '',
    icon: 'info',
    color: ''
  };
  private profileModalActions = new EventEmitter<string|MaterializeAction>();
  private friendsActivities: any = [];
  private activities: any = [];
  private latestActivities: any = [];
  private profile: any = {};
  private newProfile = this.profile;
  private upload: boolean = false;
  private latestorders :any =[];
  private loading: boolean = false;

  constructor(private appService: AppService, private loginService: LoginService, private friendsService: FriendsService , private ordersService: OrdersService) { this.profile = this.appService.user; }

  ngOnInit() {
    this.FriendsActivities();
    this.latestOrders();
  }

  editProfile(){
    this.newProfile = this.profile;
    this.profileModalActions.emit({action:"modal",params:['open']});
  }

  saveProfile(){
    let id = this.newProfile._id;
    if(!this.upload)
      delete this.newProfile.image;
    delete this.newProfile._id;
    this.loading = true;
    this.friendsService.updateUserProfile(id, this.newProfile).subscribe(
      (data) => {
        this.loading = false;
        this.updateProfile(id);
        this.closeProfileModal();
        this.setModalMsg(data.message,1);
      },
      (error) => {
        this.loading = false;
        this.closeProfileModal();
        this.setModalMsg(error.json().message,0);
      }
    )
  }

  updateProfile(id: string){
    console.log(id);
    this.friendsService.getUserProfile(id).subscribe(
      (data) => {this.appService.setUser(data); console.log('user updated')},
      (error) => {console.log(error)}
    )
  }

  closeProfileModal(){
    this.profileModalActions.emit({action:"modal",params:['close']});
    this.upload = false;
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

  uploaded(file){
    this.newProfile.image = file;
    this.upload = true;
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
