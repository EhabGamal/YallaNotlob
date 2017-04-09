import {Component, EventEmitter, ViewChild, OnInit} from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('modal') modal;
  modalMsg = {msg:"Testing again", icon:'person', warning:true};

  constructor() { }

  ngOnInit() {
  }

}
