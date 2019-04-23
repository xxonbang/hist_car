import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { InputFieldsModel } from '../input-fields-model';





// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // 기본 url 주소 설정
  private baseUrl = '/rest';

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }



  // login(userId: string, userPassword: string) {
  //   return this.http.post<any>(this.baseUrl + '/auth/login', { username: userId, password: userPassword })
  //     .pipe(map(res => {

  //       if (res && res.token) {
  //         localStorage.setItem('accessToken', JSON.stringify(res));
  //         this.router.navigate(['/main']);
  //       }
  //       return res;
  //     }));
  // }



  // 로그인 기능
  login(userId: string, userPassword: string) {

    // 로그인 성공 시, response 값의 accessToken 값을 웹 브라우저의 localStorage 내 accessToken 값으로 설정, main page로 리다이렉션
    const ok = (res => {
      console.dir('success');
      localStorage.setItem('accessToken', res.accessToken)
      this.router.navigate(['/main']);
    });

    const err = (res => {
      alert('ID 와 PASSWORD 를 확인하세요');
    });

    this.http.post<InputFieldsModel>(this.baseUrl + '/auth/login', { username: userId, password: userPassword })
      .subscribe(ok, err);
  }

  // 로그아웃 기능, 수행 시 웹브라우저 내의 accessToken 값을 삭제하고 login page로 리다이렉션
  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }


  //////////////////////////////////////
  // serviceName = 'login';
  // url: string = environment.serverPrefix + `/${this.serviceName}`;

  // getLoginPage(ok: any, err: any) {
  //   this.http.get(this.url.replace('/secure', '') + '/login', ok, err);
  // }

  // login(user: User, ok: any, err: any): void {
  //   this.http.post(this.url.replace('/secure', '') + '/login', user, ok, err);
  // }

  // logout(ok: any, err: any): void {
  //   this.http.post(this.url.replace('/secure', '') + '/logout', {}, ok, err);
  // }

}
