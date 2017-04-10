import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-404',
  template: `
    <div class="container">
      <div id="notfound" style="color: #FFF; position: absolute; z-index: 3">
        <h1 style="font-size: 10em">404</h1>
        <h2>Houston, we have a problem.</h2>
        <p>Actually, the page you are looking for does not exist.</p>
        <p><a [routerLink]="['/home']" >Return Home</a></p>
      </div>
      <div style="background-color: #000; position: absolute; z-index: 1; top: 0; bottom: 0; left: 0; right: 0">asd</div>
    </div>
    <img src="assets/images/earth.jpg" alt="Page not found" class="responsive-img" style="position: absolute; z-index: 2; bottom: 0; right: 0;">
  `,
  styles: []
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
