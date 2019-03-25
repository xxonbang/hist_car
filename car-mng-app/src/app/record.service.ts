import { Injectable } from '@angular/core';
import { RecordModel } from './record-model';
// import { HttpUtils } from '../../shared/http-utils';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(
    // public httpUtils: HttpUtils,
  ) { }

  record = new RecordModel();
  allParams = new RecordModel();

  setParamData(recordParam: RecordModel) {
    this.allParams = recordParam;
    this.getRecordList();
  }

  getRecordList() {

  }

}
