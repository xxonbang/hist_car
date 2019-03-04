import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  public curUrl;
  public _router;

  constructor(private router: Router) {
    this._router = router;
  }

  ngOnInit() {
    console.log(this._router.url);
  }

}
