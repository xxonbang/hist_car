import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { InputFieldsModel } from '../input-fields-model';





// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };
@Injectable({
  providedIn: 'root'
})
export class LoginService {

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



  ////////////////////////////////////
  login(userId: string, userPassword: string) {
    // const body = {
    //   username: 'admin',
    //   password: 'admin1234'
    // };

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
