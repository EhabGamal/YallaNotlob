import { Component, OnInit} from '@angular/core';
import { GroupsService } from '../services/groups.service'
import { AppService } from '../services/app.service'

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
  providers: [ GroupsService ]
})
export class GroupsComponent implements OnInit {

  loading: boolean = true;
  groupName: string = '';
  memberEmail: string = '';
  public groups: any = {};
  public currentGroup: any = {};
  constructor(private appService: AppService, private groupsService: GroupsService) { }

  ngOnInit() {
    this.bindGroups();
  }
  bindGroups(){
    this.loading = true;
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
        (data: any) => { console.log(data); },
        (error: any) => { this.loading = false; },
        () => { this.loading = false; }
      );
    }
  }
  viewGroup(group){
    this.currentGroup = group;
    console.log('view members');
    console.log(this.currentGroup);
  }
  removeGroup(gid: string){
    console.log('remove group'+gid);
    this.loading = true;
    this.groupsService.removeGroup(gid).subscribe(
      (data: any) => { console.log(data); this.bindGroups() },
      (error: any) => { this.loading = false; },
      () => { this.loading = false; }
    );
  }
  addMember(){
    console.log("add user "+this.memberEmail+" to group "+this.currentGroup._id);
    this.loading = true;
    this.groupsService.addMember(this.currentGroup._id,this.memberEmail).subscribe(
      (data: any) => { console.log(data); this.bindGroups() },
      (error: any) => { this.loading = false; },
      () => { this.loading = false; }
    );
  }
  removeMember(uid: string){
    console.log("remove user "+uid+" to group "+this.currentGroup._id);
    this.loading = true;
    this.groupsService.removeMember(this.currentGroup._id,uid).subscribe(
      (data: any) => { console.log(data); this.bindGroups() },
      (error: any) => { this.loading = false; },
      () => { this.loading = false; }
    );
  }
}
