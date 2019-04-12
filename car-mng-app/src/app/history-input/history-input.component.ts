import { Component, OnInit } from '@angular/core';
import { InputFieldsModel } from '../input-fields-model';
import { DatePipe } from '@angular/common';
import { RecordService } from '../record.service';
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
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit() {
    // this.record.dateFrom = new Date();
    // this.record.dateTo = new Date();


    this.getHistCarList();
    this.getUseTypeList();
    this.getUsePursList();

    this.historyInputForm = new FormGroup({
      datefrom: new FormControl(this.record.datefrom, [Validators.required]),
      dateto: new FormControl(),
      driverdept: new FormControl(),
      drivernm: new FormControl(this.record.drivernm, [Validators.required, Validators.minLength(10)]),
      usetype: new FormControl(),
      usepurs: new FormControl(),
      usepursdetail: new FormControl(),
      drivedist: new FormControl(),
      accummileage: new FormControl(),
      dest: new FormControl(),
      dropby: new FormControl(),
      fueling: new FormControl(),
      histCar: new FormControl(),
    });

    const today = new Date();
    this.historyInputForm.controls['datefrom'].setValue(today);
    this.historyInputForm.controls['dateto'].setValue(today);

    // this.historyInputForm.setValue({ useType: '- 선택 -' });
    // this.historyInputForm.controls['useType'].setValue({ "name": "- 선택 -" });
    // this.historyInputForm.controls['usePurs'].setValue({ "name": "- 선택 -" });

  }

  // drop-box 형 input box 내 기본 값을 '- 선택 -' 으로 주기 위해 메소드로 만들어 ngOninit에 넣어보려 했었음.
  // setDefaultSelectionList() {
  //   this.historyInputForm.controls['histCar'].setValue('- 선택 -');
  // }

  // sever 와의 통신을 위한 date form 변경
  transformDate(date) {
    return this.datePipe.transform(date, 'yyyyMMdd');
  }

  // 차량선택 input box 내 List 조회용
  getHistCarList() {
    this.service.getHistCarSelectionList()
      .subscribe(
        this.getHistCarListOk(),
        this.getHistCarListError()
      );
  }

  // 사용유형 input box 내 List 조회용
  getUsePursList() {
    this.service.getUsePursSelectionList()
      .subscribe(
        this.getUsePursListOk(),
        this.getUsePursListError()
      );
  }

  // 사용형태 input box 내 List 조회용
  getUseTypeList() {
    this.service.getUseTypeSelectionList()
      .subscribe(
        this.getUseTypeListOk(),
        this.getUseTypeListError()
      );
  }

  // 서버로 부터 받아온 response SelectionListModel 배열에 담아 html 에서 사용할 수 있도록 함.
  getHistCarListOk() {
    return (res: SelectionListModel[]) => this.histCarList = res;
  }

  getUsePursListOk() {
    return (res: SelectionListModel[]) => this.usePursList = res;
  }

  getUseTypeListOk() {
    return (res: SelectionListModel[]) => this.useTypeList = res;
  }

  // 서버 통신 시, error 처리
  getHistCarListError() {
    return error => console.log(error);
  }

  getUsePursListError() {
    return error => console.log(error);
  }

  getUseTypeListError() {
    return error => console.log(error);
  }

  // 입력 완료 button 클릭 시, 기능 수행
  // inputFrom.value 값을 받아와 sevice의 addInputData 로 전달 후, subscribe 콜백 함수로 받아온 data를 recordList 배열에 추가
  add(): void {

    if (!this.historyInputForm.value) {
      return alert('입력 조건을 확인하세요.');
    }

    // server 쪽에서 date data 를 받을 때, yyyy-mm-dd 형태로 받게 되어 있으므로, 해당 형태로 날짜를 변환해서 보내기 위함
    this.historyInputForm.controls['datefrom'].setValue(this.transformDate(this.historyInputForm.controls['datefrom'].value));
    this.historyInputForm.controls['dateto'].setValue(this.transformDate(this.historyInputForm.controls['dateto'].value));

    this.service.addInputData(this.historyInputForm.value);

  }

  // 닫기 기능 호출, localStorage 내 'accessToken' 정보를 제거하고 login Page로 리다이렉션
  close(): void {
    this.service.goToMainPage();
  }

}


