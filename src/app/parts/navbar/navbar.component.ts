import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  user: any;
  constructor(private appService: AppService) { this.user = appService.user; }

  ngOnInit() {
  }

}
