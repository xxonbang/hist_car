import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  isLogin: boolean;

  constructor(private router: Router) {

  }

  ngOnInit() {

    if (localStorage.getItem('AuthInfo')) {
      this.isLogin = true;
    } else {
      this.router.navigate(['auth/login']);
    }
  }

}
