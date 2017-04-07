import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { SignupService } from "../services/signup.service";
import { AppService } from "../services/app.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [ SignupService, AppService ]
})
export class SignupComponent implements OnInit {

  user = {
    email: '',
    password: '',
    rpassword: '',
    firstName: '',
    lastName: ''
  };
  msg: string = '';
  loading: boolean = false;
  constructor( private router: Router, private signupService: SignupService, private appService: AppService) { }

  ngOnInit() {
  }

  onSubmit( form: NgForm ){
    if(this.user.password === this.user.rpassword){
      console.log(this.user);
      this.msg = '';
      this.loading = true;
      this.signupService.register(this.user).subscribe(
        (data: any) => {
          console.log(data);
          localStorage.setItem('token', data.token);
          this.appService.setLoggedin(true);
          this.appService.user = data.user;
          this.router.navigate(['/']);
          this.loading = false;
        },
        (error: any) => {
          this.msg = error.json().error;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    }else{
      this.msg = 'Password does not match the confirm!';
    }
  }

}
