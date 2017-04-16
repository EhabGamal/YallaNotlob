import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppService } from '../../services/app.service'
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  user: any;
  constructor(private appService: AppService, private loginService: LoginService,private router: Router) { this.user = appService.user; }

  ngOnInit() {
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
