import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  login() {
    const body = {
      username: 'admin',
      password: 'admin1234'
    };

    const ok = (res => {
      console.dir('success');
      localStorage.setItem('accessToken', res.accessToken)
      this.router.navigate(['/main']);
    });

    const err = (res => {
      console.dir('error');
    });

    this.http.post<InputFieldsModel>(this.baseUrl + '/auth/login', body).subscribe(ok, err);
  }

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
