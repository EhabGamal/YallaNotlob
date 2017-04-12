import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-uploader',
  template: `
    <div class="file-field input-field">
      <div class="btn">
        <span>{{tag}}</span>
        <input type="file" [accept]="accept" (change)="onUpload($event)" >
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" [(ngModel)]="inputname" type="text">
      </div>
    </div>
  `,
  styles: []
})
export class UploaderComponent implements OnInit {

  @Output('upload') file = new EventEmitter();
  @Input() tag;
  @Input() accept;
  private inputname: string = '';

  constructor() { }

  ngOnInit() {
    console.log(this.accept);
  }

  onUpload(event){
    console.log(event.target.files[0]);
    let reader = new FileReader();
    reader.onloadend = (e) => {
      this.file.emit(reader.result);
    }
    reader.readAsDataURL(event.target.files[0])
  }

}
