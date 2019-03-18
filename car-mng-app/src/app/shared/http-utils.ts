import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { LoadingService } from './loading/loading.service';
import { Subscription } from 'rxjs';
import { ArtLogger } from './artLogger';
// import { AuthGuardService } from '../auth/auth-service/auth-guard.service';
import { MsgUtils } from './msg-utils';
import { environment } from '../../environments/environment';
import { StringUtils } from './string-utils';
import { Common } from './common.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable()
export class HttpUtils {
    headInfo: HttpHeaders;

    url: string = environment.serverPrefix + `/auth/`;
    commonParam = new Common();
    appendForm: FormGroup;

    constructor(
        private _http: HttpClient,
        public loadingService: LoadingService,
        private authGuard: AuthGuardService,
        private fb: FormBuilder,
        public router: Router
    ) {
        // this.createAppendForm();
    }

    createAppendForm() {
        this.appendForm = this.fb.group({
            authAgentCd: '',
            authUserId: ''
        });
    }

    errCallback() {
        return (error => {
            ArtLogger.error(error);
            alert(MsgUtils.error());
        });
    }

    setCommonParam() {
        const auth = JSON.parse(localStorage.getItem('artAuthInfo'));
        this.commonParam.authAgentCd = auth.agentCd;
        this.commonParam.authUserId = auth.userid;
    }

    // paramList = 화면에서 넘긴 코드테이블에서 조회할 마스터 코드 리스트 및 기타 정보들, 추가 필요시 규격을 변경해야함.
    // urlType = 기본 값만 가져올건지 전체를 다 가져올지 선택함 기본 공백, 필요시 all
    // valueType = 기본값은 kor_nm에서 가져오며 필요시 eng_nm으로 대체, 기본 공백 필요시 eng
    // errUse = 에러 콜백을 지정함. 지정안할시 utils에 선언된 기본 errCallback을 사용함.
    getCodeSelect(paramList, ok, codeType?: string, urlType?: string, errUse?, complete?: any, httpHeader?: HttpHeaders): Subscription {
        const urlParam = StringUtils.makeQueryString(paramList) + StringUtils.appendQueryString(codeType !== undefined ? codeType : '');
        const err = errUse !== undefined ? errUse : this.errCallback();
        const url = environment.serverPrefix + '/code' + (urlType === undefined ? '/codeSelect' : '/codeSelectAll');

        if (this.canUseUrl(url)) {

            const curUrl = url + urlParam;

            const payload = {
                successCallback: ok,
                errorCallback: err,
                url: curUrl,
                method: 'get',
                body: ''
            };

            const comErr = (error => {
                this.commonErrorHandler(error, payload);
            });

            return this._http.get<any>(curUrl, { headers: httpHeader }).pipe().subscribe(ok, comErr, complete);
        }
    }

    getArraySelect(paramList, ok, complete?: any, httpHeader?: HttpHeaders): Subscription {
        const urlParam = StringUtils.makeQueryString(paramList);
        const url = environment.serverPrefix + '/code' + '/arraySelect';

        if (this.canUseUrl(url)) {

            const curUrl = url + urlParam;

            const payload = {
                successCallback: ok,
                errorCallback: this.errCallback(),
                url: curUrl,
                method: 'get',
                body: ''
            };

            const comErr = (error => {
                this.commonErrorHandler(error, payload);
            });

            return this._http.get<any>(curUrl, { headers: httpHeader }).pipe().subscribe(ok, comErr, complete);
        }
    }

    // paramList = 화면에서 넘긴 코드테이블에서 조회할 마스터 코드 리스트 및 기타 정보들, 추가 필요시 규격을 변경해야함.
    // urlType = 기본 값만 가져올건지 전체를 다 가져올지 선택함 기본 공백, 필요시 all
    // valueType = 기본값은 kor_nm에서 가져오며 필요시 eng_nm으로 대체, 기본 공백 필요시 eng
    // errUse = 에러 콜백을 지정함. 지정안할시 utils에 선언된 기본 errCallback을 사용함.
    getEtcSelect(paramList, ok, complete?: any, httpHeader?: HttpHeaders): Subscription {
        const urlParam = StringUtils.makeQueryString(paramList);
        const url = environment.serverPrefix + '/code' + '/etcSelect';

        if (this.canUseUrl(url)) {

            const curUrl = url + urlParam;

            const payload = {
                successCallback: ok,
                errorCallback: this.errCallback(),
                url: curUrl,
                method: 'get',
                body: ''
            };

            const comErr = (error => {
                this.commonErrorHandler(error, payload);
            });

            return this._http.get<any>(curUrl, { headers: httpHeader }).pipe().subscribe(ok, comErr, complete);
        }
    }

    get(url: string, ok: any, err: any, complete?: any, httpHeader?: HttpHeaders): Subscription {
        const canUseUrl = this.canUseUrl(url);
        if (canUseUrl) {
            this.loadingService.loadingStart();
            const loadingEnd = (
                () => { this.loadingService.loadingEnd(); }
            );

            if (canUseUrl > 1) {
                // this.setCommonParam();
                // url = url + StringUtils.appendQueryString(this.commonParam);
            }

            const curUrl = url;

            const payload = {
                successCallback: ok,
                errorCallback: err,
                url: curUrl,
                method: 'get',
                body: ''
            };

            const comErr = (error => {
                this.commonErrorHandler(error, payload);
            });

            return this._http.get<any>(url, { headers: httpHeader }).pipe().subscribe(ok, comErr, complete).add(loadingEnd);
        }
    }

    post(url: string, data: any, ok: any, err: any, complete?: any, httpHeader?: HttpHeaders): Subscription {
        if (this.canUseUrl(url)) {
            this.loadingService.loadingStart();
            const loadingEnd = (
                () => {
                    this.loadingService.loadingEnd();
                }
            );

            const curUrl = url;

            const payload = {
                successCallback: ok,
                errorCallback: err,
                url: curUrl,
                method: 'post',
                body: data
            };

            const comErr = (error => {
                this.commonErrorHandler(error, payload);
            });

            return this._http.post(url, data, { headers: httpHeader }).pipe().subscribe(ok, comErr, complete).add(loadingEnd);
        }
    }

    put(url: string, data: any, ok: any, err: any, complete?: any, httpHeader?: HttpHeaders): Subscription {
        if (this.canUseUrl(url)) {
            this.loadingService.loadingStart();
            const loadingEnd = (
                () => { this.loadingService.loadingEnd(); }
            );

            const curUrl = url;

            const payload = {
                successCallback: ok,
                errorCallback: err,
                url: curUrl,
                method: 'put',
                body: data
            };

            const comErr = (error => {
                this.commonErrorHandler(error, payload);
            });

            return this._http.put(curUrl, data, { headers: httpHeader }).pipe().subscribe(ok, comErr, complete).add(loadingEnd);
        }
    }

    delete(url: string, ok: any, err: any, complete?: any, httpHeader?: HttpHeaders): Subscription {
        if (this.canUseUrl(url)) {
            this.loadingService.loadingStart();
            const loadingEnd = (
                () => { this.loadingService.loadingEnd(); }
            );

            const curUrl = url;

            const payload = {
                successCallback: ok,
                errorCallback: err,
                url: curUrl,
                method: 'put',
                body: ''
            };

            const comErr = (error => {
                this.commonErrorHandler(error, payload);
            });

            return this._http.delete(curUrl, { headers: httpHeader }).pipe().subscribe(ok, comErr, complete).add(loadingEnd);
        }
    }

    toLogout() {
        localStorage.clear();
        alert(MsgUtils.logout());
        window.location.href = '';
    }

    private canUseUrl(url: string): number {
        let result = 0;
        if (this.isExceptAuthCheckUrl(url)) {
            result = 1;
        } else if (this.authGuard.canActivate()) {
            result = 2;
        }

        return result;
    }

    private isExceptAuthCheckUrl(url: string): boolean {
        const exceptUrlList = ['auth/getLoginPage', 'auth/login', 'auth/logout', 'auth/refresh'];
        let result = false;
        exceptUrlList.forEach(exceptUrl => {
            if (url.indexOf(exceptUrl) > 0) {
                result = true;
            }
        });
        return result;
    }

    public errorHandler(error, callback) {
        if (error.status === 401) {
            setTimeout(() => {
                callback();
            }, 5000);
        }
    }

    public commonErrorHandler(error, payload) {
        if (error !== undefined) {
            if (error.status !== undefined) {
                if (error.status === 401) {
                    setTimeout(() => {
                        if (payload.method === 'get') {
                            this.get(payload.url, payload.successCallback, (err => {
                                this.commonErrorHandler(err, payload);
                            }));
                        } else if (payload.method === 'post') {
                            this.post(payload.url, payload.data, payload.successCallback, (err => {
                                this.commonErrorHandler(err, payload);
                            }));
                        } else if (payload.method === 'put') {
                            this.put(payload.url, payload.data, payload.successCallback, (err => {
                                this.commonErrorHandler(err, payload);
                            }));
                        } else if (payload.method === 'delete') {
                            this.delete(payload.url, payload.successCallback, (err => {
                                this.commonErrorHandler(err, payload);
                            }));
                        }
                    }, 3000);
                } else if (error.status === 406) {
                    // const isLogout = confirm(MsgUtils.auth_expired());
                    // if (isLogout) {
                    //   this.router.navigate(['auth/logout']);
                    // }
                } else {
                    if (payload.errorCallback !== '' && payload.errorCallback !== undefined) {
                        payload.errorCallback(error);
                    }
                }
            }
        }
    }

}
