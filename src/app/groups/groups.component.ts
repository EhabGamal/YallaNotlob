import {Component, EventEmitter, OnInit} from '@angular/core';
import { GroupsService } from '../services/groups.service'
import { AppService } from '../services/app.service'
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
  providers: [ GroupsService ]
})
export class GroupsComponent implements OnInit {

  modalActions = new EventEmitter<string|MaterializeAction>();
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

  loading: boolean = true;
  groupName: string = '';
  public groups: any = {};
  public members: any = [];
  constructor(private appService: AppService, private groupsService: GroupsService) { }

  ngOnInit() {
    this.bindGroups();
  }
  bindGroups(){
    this.groupsService.getAll(this.appService.user._id).subscribe(
      (data: any) => { this.groups = data; console.log(this.groups); },
      (error: any) => { this.loading = false; },
      () => { this.loading = false; }
    );
  }
  addGroup(){
    if( this.groupName !== '' ){
      this.loading = true;
      this.groupsService.addGroup(this.groupName).subscribe(
        (data: any) => {
          console.log(data);
        },
        (error: any) => {
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    }
  }
  viewGroupMembers(members){
    this.members = members;
    console.log('view members');
    console.log(this.members);
  }
  removeGroup(gid: string){
    console.log('remove group');
  }
  addUserToGroup(uid: string){

  }
  removeUserFromGroup(uid: string){
  }
}
