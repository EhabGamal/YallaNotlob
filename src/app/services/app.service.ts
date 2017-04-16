import {Injectable} from '@angular/core';
@Injectable()
export class AppService {

  private loggedin = false;
  public user: any = JSON.parse(localStorage.getItem('user'));
  public token: string = localStorage.getItem('token');
  constructor() {
  }
  checkStatus(): boolean {
    return this.loggedin;
  }

  setLoggedin(value: boolean) {
    this.loggedin = value;
  }

  setUser(user: any){
    localStorage.setItem('user',JSON.stringify(user));
    this.user = user;
  }

}
