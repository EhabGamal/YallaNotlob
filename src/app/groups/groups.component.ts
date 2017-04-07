import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../services/groups.service'
import { AppService } from '../services/app.service'

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
  providers: [ GroupsService, AppService ]
})
export class GroupsComponent implements OnInit {

  constructor(private appService: AppService, private groupsService: GroupsService) { }

  ngOnInit() {
    console.log(this.appService.user);
    //this.groupsService.getAll(this.appService.user.id).subscribe()
  }

}
