import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { LoginService } from '../services/login.service'
import { AppService } from '../services/app.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ]
})
export class LoginComponent implements OnInit {

  user: {} = {
    email: '',
    password: ''
  };
  msg: string = '';
  loading: boolean = false;
  constructor(private router: Router, private loginService: LoginService, private appService: AppService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.msg = '';
    this.loading = true;
    this.loginService.authLogin(this.user).subscribe(
      (data: any) => {
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        this.appService.setLoggedin(true);
        this.appService.user = data.user;
        this.appService.token = data.token;
        this.router.navigate(['/']);
        this.loading = false;
      },
      (error: any) => {
        this.msg = 'Invalid Email or Password';
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
}
