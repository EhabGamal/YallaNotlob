import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AppService } from "./services/app.service";
import { LoginService } from "./services/login.service";
import { SocketService } from "./services/socket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AppService, LoginService, SocketService ]
})
export class AppComponent {
  title = 'app works!';
  constructor(private router:Router){}
}
