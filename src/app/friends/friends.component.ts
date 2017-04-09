import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../services/friends.service'
import { AppService } from '../services/app.service'

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
  providers: [ FriendsService ]
})
export class FriendsComponent implements OnInit {

  private loading: boolean = false;
  public friends: any = [];
  public friendEmail: string = '';
  constructor(private appService: AppService, private friendsService: FriendsService) { }

  ngOnInit() {
    this.bindFriends();
  }
  bindFriends(){
    this.loading = true;
    this.friendsService.getAll(this.appService.user._id).subscribe(
      (data: any) => { this.friends = data; console.log(this.friends); },
      (error: any) => { this.loading = false; },
      () => { this.loading = false; }
    );
  }
  addFriend(){
    if( this.friendEmail !== '' ){
      this.loading = true;
      this.friendsService.addFriend(this.friendEmail).subscribe(
        (data: any) => { console.log(data); this.bindFriends(); this.friendEmail=''; },
        (error: any) => { this.loading = false; },
        () => { this.loading = false; }
      );
    }
  }
  unFriend(id: string){
    this.loading = true;
    this.friendsService.unFriend(id).subscribe(
      (data: any) => { console.log(data); this.bindFriends(); },
      (error: any) => { this.loading = false; },
      () => { this.loading = false; }
    );
  }

}
