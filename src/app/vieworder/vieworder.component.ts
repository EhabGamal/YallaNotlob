import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.component.html',
  styleUrls: ['./vieworder.component.css']
})
export class VieworderComponent implements OnInit {

  constructor( private router: ActivatedRoute ) { }

  ngOnInit() {
    this.router.params.subscribe(
      (data) => { console.log(data) }
    )
  }

}
