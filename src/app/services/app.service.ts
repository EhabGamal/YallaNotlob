import { Injectable } from '@angular/core';

@Injectable()
export class AppService {

  constructor() { }

  private loggedin = false;
  public user: any = JSON.parse(localStorage.getItem('user'));
  public token: string = localStorage.getItem('token');

  checkStatus(): boolean {
    return this.loggedin;
  }

  setLoggedin(value: boolean) {
    this.loggedin = value;
  }

 

}
