import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup;

  constructor(
    // private formBuilder: FormBuilder,
    // private router: Router,
    // private loginService: LoginService
  ) { }

  // onSubmit() { 
  //   if (this.loginForm.invalid) {
  //     return;
  //   }
  //   // this.submitted = true;
  //   const userid: string = this.loginForm.controls.userid.value;
  //   const password: string = this.loginForm.controls.password.value;

  //   const ok = ( res => {
  //     this.auth = res.jwtUser;

  //     if (this.auth && this.auth.userid === userid) {
  //       localStorage.setItem('artAuthInfo', JSON.stringify(this.auth));
  //       localStorage.setItem('accessToken', JSON.stringify(res.accessToken).replace(/"/g, ''));
  //       localStorage.setItem('refreshToken', JSON.stringify(res.refreshToken).replace(/"/g, ''));
  //       localStorage.setItem('serverAccessTime', JSON.stringify(res.serverAccessTime).replace(/"/g, ''));
  //       localStorage.setItem('accessTime', new Date().getTime().toString());
  //     }
  //     window.location.href = '/';
  //   });
  //   const err = ( error => {
  //     alert(MsgUtils.login_error());
  //   });
  //   this.user = new User();
  //   this.user.userid = userid;
  //   this.user.userpw = password;
  //   this.authService.login(this.user, ok, err);
  // }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}
