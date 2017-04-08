import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AppService } from "./services/app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AppService ]
})
export class AppComponent {
  title = 'app works!';
  constructor(private router:Router){}
}
