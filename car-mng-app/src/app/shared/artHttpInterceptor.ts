import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpSentEvent,
  HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AuthRefreshService } from '../auth/auth-service/auth-refresh.service';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Router } from '@angular/router';
import { ArtLogger } from '../shared/artLogger';
import {MsgUtils} from './msg-utils';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class ArtHttpInterceptor implements HttpInterceptor {

    headerInfo: HttpHeaders;

    isRefreshingToken = false;

    isInLogoutProcess = false;

    // emit token status
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(
        private cookieService: CookieService,
        private authRefreshService: AuthRefreshService,
        private _http: HttpClient,
        public router: Router
    ) { }

    addToken(req: HttpRequest<any>, xsrfToken: String, authToken: String, refreshToken: String): HttpRequest<any> {
      return req.clone({
        headers: req.headers
          .append('X-XSRF-TOKEN', xsrfToken + '')
          .append('X-Requested-With', 'ART')
          .append('x-access-token', authToken + '')
          .append('x-access-refresh', refreshToken + ''),
        withCredentials: true
      });
    }

    getAccessToken(): String {
      return localStorage.getItem('accessToken') === null ? '' : localStorage.getItem('accessToken');
    }

    getRefreshToken(): String {
      return localStorage.getItem('refreshToken') === null ? '' : localStorage.getItem('refreshToken');
    }

    getXSRFToken(): String {
      return this.cookieService.get('X-XSRF-TOKEN');
    }

    intercept(req: HttpRequest<any>, next: HttpHandler):
      Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

        const jwtHelperService = new JwtHelperService();
        const accessToken: string = this.getAccessToken().toString();
        // if access token has passed after the validation datetime of refresh token, and do not send it, just log-out
        if (accessToken === '' || accessToken === undefined) {
          return next.handle(req);
        } else {
          const expirationDate = jwtHelperService.getTokenExpirationDate(accessToken);
          return next.handle(this.addToken(req, this.getXSRFToken(), this.getAccessToken(), this.getRefreshToken()))
            .pipe(
              tap((event: HttpEvent<any>) => {
                // if (event instanceof HttpResponse) {
                //   //todo
                // }
              }, (error: any) => {
                if (error instanceof HttpErrorResponse) {
                  switch ((<HttpErrorResponse>error).status) {
                    case 401:
                      return this.handle401Error(req, error, next);
                    case 406:
                      return this.handle406Error(req, error, next);
                  }
                }
              })
            );
        }
    }

    handle401Error(req: HttpRequest<any>, error: any, next: HttpHandler) {
      // token refresh 여부
      ArtLogger.debug('ArtHttpInterceptor - handle401Error');

      if (!this.isRefreshingToken) {
        // ArtLogger.debug('it is not the middle of token refreshing process.');
        if (req.url.indexOf('auth/login') === -1) {
          // ArtLogger.debug('it is not a login request.');
          this.isRefreshingToken = true;
          // Reset here so that the following requests wait until the token
          // comes back from the refreshToken call.
          this.tokenSubject.next(null);

          const serviceName = 'auth';
          const url = environment.serverPrefix + `/${serviceName}/`;

          return this.authRefreshService.refreshToken().pipe(
            map((ok: any, err: any) => {
              this._http.post<any>(url.replace('/secure', '') + 'refresh', {
                'X-XSRF-TOKEN': this.getXSRFToken(),
                'X-Requested-With': 'ART',
                'x-access-token': this.getAccessToken(),
                'x-access-refresh': this.getRefreshToken()
              }).pipe().subscribe(function(res) {
                localStorage.setItem('accessToken', JSON.stringify(res.accessToken).replace(/"/g, ''));
                localStorage.setItem('refreshToken', JSON.stringify(res.refreshToken).replace(/"/g, ''));
                localStorage.setItem('serverAccessTime', JSON.stringify(res.serverAccessTime).replace(/"/g, ''));
                localStorage.setItem('accessTime', new Date().getTime().toString());
                this.isRefreshingToken = false;
              }, function() {
                if (err.status === 406) {
                  ArtLogger.error('refresh async request error: ' + JSON.stringify(err));
                  this.logoutUser();
                } else {
                  ArtLogger.error('error: ' + err.message);
                }
              });
            })
          ).subscribe(
            data => {
              // if (data !== undefined) {
              //   this.isRefreshingToken = false;
              // }
            },
            err => {
              // If there is an exception calling 'refreshToken', bad news so logout.
              ArtLogger.error(err);
              return this.logoutUser();
            }
          );
        } else {
          ArtLogger.debug('it is a login request.');
        }
      } else {
        ArtLogger.debug('it is the middle of token refreshing process.');
      }
    }

    handle406Error(req: HttpRequest<any>, error: any, next: HttpHandler) {
      ArtLogger.debug('ArtHttpInterceptor - handle406Error'); // logout and forward to login page
      if (this.isInLogoutProcess === false) {
        this.isInLogoutProcess = true;
        const isLogout = confirm(MsgUtils.auth_expired());
        if (isLogout) {
          this.router.navigate(['auth/logout']);
        } else {
          this.isInLogoutProcess = false;
        }
      }
    }

    logoutUser() {
      return Observable.throw('');
    }

}
