import { Injectable } from '@angular/core';
import { CommonModel } from './common-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private carMngAppUrl = 'https://jwt-backend-test.herokuapp.com/';  // 웹 API 형식의 URL로 사용

  constructor(
    private http: HttpClient,
  ) { }

  record = new CommonModel();
  allParams = new CommonModel();

  setParamData(recordParam: CommonModel) {
    this.allParams = recordParam;
    this.getRecord();
  }

  getRecord(): Observable<CommonModel[]> {
    return this.http.get<CommonModel[]>(this.carMngAppUrl)
      .pipe(
        // tap(_ => this.log('fetched record')),
        catchError(this.handleError('getRecord', []))
      );

  }





























  /**
 * HTTP 요청이 실패한 경우를 처리합니다.
 * 애플리케이션 로직 흐름은 그대로 유지됩니다.
 * @param operation - 실패한 동작의 이름
 * @param result - 기본값으로 반환할 객체
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: 리모트 서버로 에러 메시지 보내기
      console.error(error); // 지금은 콘솔에 로그를 출력합니다.

      // TODO: 사용자가 이해할 수 있는 형태로 변환하기
      // this.log(`${operation} failed: ${error.message}`);

      // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환합니다.
      return of(result as T);
    };
  }
}