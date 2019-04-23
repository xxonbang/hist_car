import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from './login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
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

  // 로그인 input-box 들에 대한 form 및 유효성(최소, 최대 글자수) 설정
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userId: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      userPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    });
  }

  // html 에서 form control 을 편하게 하기 위하여 f() 펑션 생성
  get f() { return this.loginForm.controls; }

  // 로그인 버튼 click 시 login service로 id 와 password 값을 전달
  login() {
    this.loginService.login(this.f.userId.value, this.f.userPassword.value);
  }

  // Enter 입력 시 login service로 id 와 password 값을 전달
  onEnter() {
    this.loginService.login(this.f.userId.value, this.f.userPassword.value);
  }



  
  //   onSubmit() {
  //     this.submitted = true;

  //     // stop here if form is invalid
  //     if (this.loginForm.invalid) {
  //         return alert('ID 와 비밀번호가 유효하지 않습니다');
  //     }

  //     this.loginService.login(this.f.userId.value, this.f.userPassword.value)
  //         .subscribe(
  //             data => {
  //                 this.router.navigate(['/main']);
  //             },
  //             error => {
  //                 alert(error);
  //             });
  // }


}
