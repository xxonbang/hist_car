import { Injectable } from '@angular/core';
import { CommonModel } from './common-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(
    private http: HttpClient,
  ) { }

  private carMngAppUrl = 'https://jwt-backend-test.herokuapp.com/';  // 웹 API 형식의 URL로 사용

  record = new CommonModel();
  allParams = new CommonModel();

  setParamData(recordParam: CommonModel) {
    this.allParams = recordParam;
    this.getRecord();
  }

  getRecord(): Observable<CommonModel[]> {
    return this.http.get<CommonModel[]>(this.carMngAppUrl)

  }
