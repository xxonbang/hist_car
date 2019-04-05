import { Component, OnInit } from '@angular/core';
import { InputFieldsModel } from '../input-fields-model';
import { DatePipe } from '@angular/common';
import { RecordService } from '../record.service'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { SelectionListModel } from '../selection-list-model';
@Component({
  selector: 'app-history-input',
  templateUrl: './history-input.component.html',
  styleUrls: ['./history-input.component.css'],
  providers: [DatePipe]
})
export class HistoryInputComponent implements OnInit {

  // 모든 input box 에 대한 입력 값들을 받게 될 record 변수를 CommonModel 타입으로 생성
  record = new InputFieldsModel();
  recordList: InputFieldsModel[];
  historyInputForm: FormGroup;
  selectionList: SelectionListModel[];

  // 차량조희 input box 내 List 설정용 프로퍼티
  histCarList: SelectionListModel[];
  // 사용형태 input box 내 List 설정용 프로퍼티
  useTypeList: SelectionListModel[];
  // 사용유형 input box 내 List 설정용 프로퍼티
  usePursList: SelectionListModel[];

  // carList = [
  //   { key: 1, value: '12하1234 (소렌토)' },
  //   { key: 2, value: '56하7890 (아반떼)' },
  //   { key: 3, value: '53서2493 (투싼)' }
  // ];


  constructor(
    private service: RecordService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit() {
    this.record.dateFrom = new Date();
    this.record.dateTo = new Date();

    this.getHistCarList();
    this.getUseTypeList();
    this.getUsePursList()


    this.historyInputForm = new FormGroup({
      dateFrom: new FormControl(this.record.dateFrom, [Validators.required]),
      dateTo: new FormControl(),
      driverDep: new FormControl(),
      driverNm: new FormControl(this.record.driverNm, [Validators.required, Validators.minLength(10)]),
      useType: new FormControl(),
      usePurs: new FormControl(),
      useDetail: new FormControl(),
      mileage: new FormControl(),
      accumMileage: new FormControl(),
      destination: new FormControl(),
      dropBy: new FormControl(),
      fueling: new FormControl(),
      histCar: new FormControl()
    });

    const today = new Date();
    this.historyInputForm.controls['dateFrom'].setValue(today);
    this.historyInputForm.controls['dateTo'].setValue(today);
  }

  // sever 와의 통신을 위한 date form 변경
  transformDate(date) {
    return this.datePipe.transform(date, 'yyyyMMdd');
  }

  // 차량선택 input box 내 List 조회용
  getHistCarList() {
    this.service.getHistCarSelectionList()
      .subscribe(
        this.getSelectionListOk(),
        this.getSelectionListError()
      )
  }

  // 사용유형 input box 내 List 조회용
  getUsePursList() {
    this.service.getUsePursSelectionList()
      .subscribe(
        this.getSelectionListOk(),
        this.getSelectionListError()
      )
  }

  // 사용형태 input box 내 List 조회용
  getUseTypeList() {
    this.service.getUseTypeSelectionList()
      .subscribe(
        this.getSelectionListOk(),
        this.getSelectionListError()
      )
  }

  // 서버로 부터 받아온 response SelectionListModel 배열에 담아 html 에서 사용할 수 있도록 함.
  getSelectionListOk() {
    return (res: SelectionListModel[]) => this.selectionList = res;
  }

  // 서버 통신 시, error 처리
  getSelectionListError() {
    return error => console.log(error);
  }

  // 입력 완료 button 클릭 시, 기능 수행
  // inputFrom.value 값을 받아와 sevice의 addInputData 로 전달 후, subscribe 콜백 함수로 받아온 data를 recordList 배열에 추가
  add(): void {

    // console.dir(JSON.stringify(this.historyInputForm.value));

    if (!this.historyInputForm.value) { return; }
    this.service.addInputData(this.historyInputForm.value)
      .subscribe(data => {
        this.recordList.push(data);
      });
  }

  // 닫기 기능
  close(): void {

  }

}
