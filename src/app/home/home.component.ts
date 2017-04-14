import {Component, EventEmitter, ViewChild, OnInit} from '@angular/core';
import { AppService } from '../services/app.service';
import { FriendsService } from '../services/friends.service';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ FriendsService ]
})
export class HomeComponent implements OnInit {

  @ViewChild('modal') modal;
  modalMsg = {msg:"Testing again", icon:'person', warning:true};
  private profileModalActions = new EventEmitter<string|MaterializeAction>();
  private friendsActivities: any = [];
  private latestActivities: any = [];
  private profile: any = this.appService.user;
  private newProfile = this.profile;

  constructor(private appService: AppService ,private friendsService: FriendsService) { }

  ngOnInit() {
    this.FriendsActivities();
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
      (error: any) => {  },
      () => {  }
    );
  }

}
