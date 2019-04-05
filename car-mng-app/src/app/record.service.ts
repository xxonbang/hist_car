import { Injectable, EventEmitter } from '@angular/core';
import { InputFieldsModel } from './input-fields-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'x-access-token': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTixHVUVTVCIsImlhdCI6MTU1NDQyNjY2NCwiZXhwIjoxNTU0NDg2NjY0fQ.axXe3W8b3613iT97pjQRipxcDmzQa57-5brQprALGywry0wS8YRATS2bh11p7PmxAPpvMPDkKQ47fKV0V779PA'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  // 서버 주소 setting
  // Server Main URL
  private carMngAppUrl = 'http://localhost:6060/';

  // 업무용/비업무용(사용형태) select list data 서버
  private useTypeUrl = "http://localhost:6060/use-type/"
  //  사용목적 select list data 서버
  private usePursUrl = "http://localhost:6060/use-purs/"
  //  차량 select list data 서버
  private carListUrl = "http://localhost:6060/car-list/"

  // http 통신을 위한 angular 의 httpcient 를 http 변수에 담음
  constructor(
    private http: HttpClient,
  ) { }


  // 모든 input box 에 대한 프로퍼티를 포함한 InputFieldsModel 을 record, allParams 변수에 담음
  record = new InputFieldsModel();
  allParams = new InputFieldsModel();

  // eventEmit 형태로 차량조회, 사용목적, 사용형태 List 를 생성
  histCarList$: EventEmitter<Map<string, string>> = new EventEmitter();
  usePursList$: EventEmitter<Map<string, string>> = new EventEmitter();
  useTypeList$: EventEmitter<Map<string, string>> = new EventEmitter();

  // input box 들에 입력 된 입력 된 parameter 값들을 서버로 전달 및 저장요청
  // saveInputData(allParams) { }

  // 저장 기능 수행 시, 호출되어 input box 들로부터 입력 된 parameter 값들을 allParams 변수에 담아 setRecord 로 보내며 호출
  setParamData(recordParam: InputFieldsModel) {
    this.allParams = recordParam;
    this.addInputData(this.allParams);
  }

  // server 로 부터 차량사용기록 data 를 받아와 table 을 그리는 쪽으로 전달, 혹은 직접 그리게..?
  getRecord(): Observable<InputFieldsModel[]> {
    return this.http.get<InputFieldsModel[]>(this.carMngAppUrl)
      .pipe(
        // tap(_ => this.log('fetched record')),
        catchError(this.handleError('getRecord', []))
      );
  }

  /** POST: 서버에 data를 저장 */
  addInputData(record: InputFieldsModel): Observable<InputFieldsModel> {
    return this.http.post<InputFieldsModel>(this.carMngAppUrl, record, httpOptions)
      .pipe(
        // tap((record: InputFieldsModel) => this.log(`added record w/ driverNm=${record.driverNm}`)),
        catchError(this.handleError<InputFieldsModel>('addRecord'))
      );
  }

  // 뒤로 가기 기능
  goBack() { }

  // server 로부터 차량목록을 받아 오는 기능 -> input form 에서 select 할 수 있도록 리턴 값 전달
  getHistCarSelectionList() {
    return this.http.get(this.carListUrl, httpOptions);
  }

  getUseTypeSelectionList() {
    return this.http.get(this.useTypeUrl, httpOptions);
  }

  getUsePursSelectionList() {
    return this.http.get(this.usePursUrl, httpOptions);
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



  // 받아온 data 값을 JSON 으로 parsing 해서 원하는 타입 변수에 담는 방법 같음
  // const roles: Role[] = JSON.parse(JSON.stringify(selectedData));
}