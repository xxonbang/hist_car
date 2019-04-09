import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpSentEvent,
    HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class customHttpInterceptor implements HttpInterceptor {

    headerInfo: HttpHeaders;

    isRefreshingToken = false;

    isInLogoutProcess = false;

    // emit token status
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(
        private _http: HttpClient,
        public router: Router
    ) { }

    addToken(req: HttpRequest<any>, authToken: String): HttpRequest<any> {
        return req.clone({
            headers: req.headers
                .append('x-access-token', authToken + ''),
            withCredentials: false
        });
    }

    getAccessToken(): String {
        return localStorage.getItem('accessToken') === null ? '' : localStorage.getItem('accessToken');
    }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

        // const accessToken: string = this.getAccessToken().toString();
        // if access token has passed after the validation datetime of refresh token, and do not send it, just log-out
        // if (accessToken === '' || accessToken === undefined) {
        return next.handle(req);
        // } else {
        //     return next.handle(this.addToken(req, this.getAccessToken()));
        // }
    }


}
