import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-modal',
  template: `
    <div id="modal1" class="modal" materialize="modal" [materializeParams]="[{dismissible: false}]" [materializeActions]="modalActions">
      <div class="modal-content center">
        <i class="material-icons {{data.color}}" style="font-size: 180px">{{data.icon}}</i>
        <h4>{{data.msg}}</h4>
      </div>
      <div class="modal-footer">
        <a class="waves-effect btn-rt red-text" (click)="closeModal()"><i class="material-icons">close</i></a>
      </div>
    </div>
  `,
  styles: []
})
export class ModalComponent implements OnInit {

  @Input() data: any;
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor() { }

  ngOnInit() {
  }

  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }

  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

}
