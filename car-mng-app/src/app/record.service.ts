import { Injectable, EventEmitter } from '@angular/core';
import { CommonModel } from './common-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  // 서버 주소 setting
  private carMngAppUrl = 'https://jwt-backend-test.herokuapp.com/';  // 웹 API 형식의 URL로 사용

  // http 통신을 위한 angular 의 httpcient 를 http 변수에 담음
  constructor(
    private http: HttpClient,
  ) { }


  // 모든 input box 에 대한 프로퍼티를 포함한 Common Model 을 record, allParams 변수에 담음
  record = new CommonModel();
  allParams = new CommonModel();

  // eventEmit 형태로 차량조회, 사용목적, 사용형태 List 를 생성
  histCarList$: EventEmitter<Map<string, string>> = new EventEmitter();
  useTypeList$: EventEmitter<Map<string, string>> = new EventEmitter();
  bizOrNot$: EventEmitter<Map<string, string>> = new EventEmitter();

  // 저장 기능 수행 시, 호출되어 input box 들로부터 입력 된 parameter 값들을 allParams 변수에 담아 setRecord 로 보내며 호출
  // setParamData(recordParam: CommonModel) {
  //   this.allParams = recordParam;
  //   this.setRecord(this.allParams);
  // }

  // server 로 부터 차량사용기록 data 를 받아와 table 을 그리는 쪽으로 전달, 혹은 직접 그리게..?
  getRecord(): Observable<CommonModel[]> {
    return this.http.get<CommonModel[]>(this.carMngAppUrl)
      .pipe(
        // tap(_ => this.log('fetched record')),
        catchError(this.handleError('getRecord', []))
      );
  }

  // input box 들에 입력 된 입력 된 parameter 값들을 서버로 전달 및 저장요청
  saveInputData(allParams) { }

  /** PUT: 서버에 data를 저장 */
  addInputData(record: CommonModel): Observable<CommonModel> {
    return this.http.post<CommonModel>(this.carMngAppUrl, record, httpOptions)
      .pipe(
        // tap((record: CommonModel) => this.log(`added record w/ driverNm=${record.driverNm}`)),
        catchError(this.handleError<CommonModel>('addRecord'))
      );
  }

  goBack() { }

  getInputSelectionList(ok, err) {
    return this.http.get(this.carMngAppUrl + '해당 inputbox 의 id, key, value 등', ok, err);
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