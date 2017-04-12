import {Component, EventEmitter, ViewChild, OnInit} from '@angular/core';
import { AppService } from '../services/app.service';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('modal') modal;
  modalMsg = {msg:"Testing again", icon:'person', warning:true};
  private profileModalActions = new EventEmitter<string|MaterializeAction>();
  private friendsActivities: any = [];
  private latestActivities: any = [];
  private profile: any = this.appService.user;
  private newProfile = this.profile;

  constructor(private appService: AppService) { }

  ngOnInit() {
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

}
