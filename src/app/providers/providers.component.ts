import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ProvidersService } from '../services/providers.service';
import { AppService } from '../services/app.service';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css'],
  providers: [ ProvidersService ]
})
export class ProvidersComponent implements OnInit {

  @ViewChild('msgModal') modal;
  private providerModalActions = new EventEmitter<string|MaterializeAction>();

  private loading: number = 0;
  private admin: boolean = false;
  private newProvider: any = {name:'', icon:'assets/images/person1.png', upload:false, error:''};
  private memberEmail: string = '';
  private groups: any = {owned:[],joined:[]};
  private currentGroup: any = {};
  private currentLoc: any = [];
  private response: any = {
    msg: '',
    icon: 'info',
    color: ''
  };

  constructor() { }

  ngOnInit() {
  }

}
