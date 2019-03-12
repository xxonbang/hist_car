import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

// import { User } from '../../shared/user.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    public router: Router) { }

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
