import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';




@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})

export class LogoutComponent implements OnInit {

  constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit() {

    const ok = (
      res => {
        localStorage.clear();
        window.location.href = '/';
      }
    );
    const err = (
      error => {
        localStorage.clear();
      }
    );
    // this.loginService.logout(ok, err);

  }

}
