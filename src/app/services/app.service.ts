import { Injectable } from '@angular/core';

@Injectable()
export class AppService {

  constructor() { }

  private loggedin = false;
  public user = {};

  checkStatus(): boolean {
    return this.loggedin;
  }

  setLoggedin(value: boolean) {
    this.loggedin = value;
  }

}
