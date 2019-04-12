import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from './login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) { }

  login() {
    this.loginService.login();
  }

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
    this.loginForm = this.formBuilder.group({
      userid: ['', Validators.required],
      userPassword: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return alert('ID 와 비밀번호가 유효하지 않습니다');
    }

    this.loginService.login(this.f.userId.value, this.f.userPassword.value)
        .subscribe(
            data => {
                this.router.navigate(['/main']);
            },
            error => {
                alert(error);
            });
}


}
