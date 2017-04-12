import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import { GroupsService } from '../services/groups.service';
import { AppService } from '../services/app.service';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
  providers: [ GroupsService ]
})
export class GroupsComponent implements OnInit {

  @ViewChild('msgModal') modal;
  private groupModalActions = new EventEmitter<string|MaterializeAction>();

  private loading: number = 0;
  private admin: boolean = false;
  private newGroup: any = {name:'', icon:'assets/images/person1.png', upload:false, error:''};
  private memberEmail: string = '';
  private groups: any = {owned:[],joined:[]};
  private currentGroup: any = {};
  private currentLoc: any = [];
  private response: any = {
    msg: '',
    icon: 'info',
    color: ''
  };

  constructor(private appService: AppService, private groupsService: GroupsService) { }

  ngOnInit() {
    this.bindGroups();
  }
  bindGroups(){
    this.loading++;
    this.groupsService.getAll(this.appService.user._id).subscribe(
      (data: any) => {
        this.groups = data;
        console.log(this.groups);
        this.bindCurrentGroup();
        this.loading--;
      },
      (error: any) => {
        this.loading--;
        this.setModalMsg(error.message,0);
        },
    );
  }
  addGroup(){
    this.groupModalActions.emit({action:"modal",params:['open']});
  }
  saveGroup(){
    if( this.newGroup.name !== '' ){
      this.closeNewGroupModal();
      this.loading++;
      this.groupsService.addGroup(this.newGroup).subscribe(
        (data: any) => {
          this.bindGroups();
          this.loading--;
          this.resetNewGroup();
          this.setModalMsg(data.message,1);
        },
        (error: any) => {
          this.loading--;
          this.resetNewGroup();
          this.setModalMsg(error.message,0);
        }
      );
    }else{
      this.newGroup.error = 'Group Name is Required!';
    }
  }
  viewGroup(location, admin){
    this.currentLoc = location;
    this.bindCurrentGroup();
    this.admin = admin;
  }
  bindCurrentGroup(){
    if(this.currentLoc.length == 2 && this.groups[this.currentLoc[0]].length > this.currentLoc[1] )
      this.currentGroup = this.groups[this.currentLoc[0]][this.currentLoc[1]];
    else
      this.currentGroup = {};
  }
  removeGroup(gid: string){
    if(this.currentGroup._id == gid)
      this.currentLoc = [];

    this.loading++;
    this.groupsService.removeGroup(gid).subscribe(
      (data: any) => {
        this.bindGroups();
        this.loading--;
        this.response = {msg:data.message,icon:'delete_forever',color:'green-text'};
        this.showModal();
      },
      (error: any) => {
        this.loading--;
        this.setModalMsg(error.json().message,0);
      }
    );
  }
  leaveGroup(gid: string){
    if(this.currentGroup._id == gid)
      this.currentLoc = [];

    this.loading++;
    this.groupsService.leaveGroup(gid).subscribe(
      (data: any) => {
        this.bindGroups();
        this.loading--;
        this.response = {msg:data.message,icon:'exit_to_app',color:'green-text'};
        this.showModal();
      },
      (error: any) => {
        this.loading--;
        this.setModalMsg(error.json().message,0);
      }
    );
  }
  addMember(){
    this.loading++;
    this.groupsService.addMember(this.currentGroup._id,this.memberEmail).subscribe(
      (data: any) => {
        this.bindGroups();
        this.memberEmail = '';
        this.loading--;
        this.setModalMsg(data.message,1);
      },
      (error: any) => {
        this.loading--;
        this.setModalMsg(error.json().message,0);
      }
    );
  }
  removeMember(uid: string){
    this.loading++;
    this.groupsService.removeMember(this.currentGroup._id,uid).subscribe(
      (data: any) => {
        console.log(data);
        this.bindGroups();
        this.loading--;
        this.setModalMsg(data.message,1);
      },
      (error: any) => {
        this.loading--;
        this.setModalMsg(error.json().message,0);
      }
    );
  }
  uploaded(file){
    console.log(file);
    this.newGroup.icon = file;
    this.newGroup.upload = true;
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
  closeNewGroupModal(){
    this.groupModalActions.emit({action:"modal",params:['close']});
  }
  resetNewGroup(){
    this.newGroup = {name:'', icon:'assets/images/person1.png', upload:false, error:''};
  }
}
