import { Component, OnInit } from '@angular/core';
import { InputFieldsModel } from '../input-fields-model';
import { DatePipe } from '@angular/common';
import { RecordService } from '../record.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SelectionListModel } from '../selection-list-model';

import { Router } from '@angular/router';
@Component({
  selector: 'app-history-input',
  templateUrl: './history-input.component.html',
  styleUrls: ['./history-input.component.css'],
  providers: [DatePipe]
})

export class HistoryInputComponent implements OnInit {

  // html 의 input-box 들 유효성 검사를 위한 변수 선언, 등록 버튼 click 시 값을 true 로 설정하며 submit 된 상태에서 유효성이 안맞는 input-box들 check
  submitted = false;

  // 모든 input box 에 대한 입력 값들을 받게 될 record 변수를 CommonModel 타입으로 생성
  record = new InputFieldsModel();
  recordList: InputFieldsModel[];
  historyInputForm: FormGroup;

  // 차량조희 input box 내 List 설정용 프로퍼티
  caridList: SelectionListModel[];
  // 사용형태 input box 내 List 설정용 프로퍼티
  useTypeList: SelectionListModel[];
  // 사용유형 input box 내 List 설정용 프로퍼티
  usePursList: SelectionListModel[];


  // 날짜 제한을 위해 사용
  datefrom: Date;
  dateto: Date;

  constructor(
    private service: RecordService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }


  ngOnInit() {

    // input-box 들 중 drop-down 용 List 값을 Page loding 시 넣어주기 위함
    this.getCaridList();
    this.getUseTypeList();
    this.getUsePursList();

    // reactive form 사용을 위한 form 셋팅 및 validation option 들 설정
    this.historyInputForm = this.formBuilder.group({
      datefrom: [this.record.datefrom, [Validators.required]],
      dateto: [this.record.dateto, [Validators.required]],
      carid: [this.record.carid, [Validators.required]],
      driverdept: [this.record.driverdept, [Validators.required]],
      drivernm: [this.record.drivernm, [Validators.required, Validators.pattern("[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z]*")]],
      usetype: [this.record.usetype, [Validators.required]],
      usepurs: [this.record.usepurs, [Validators.required]],
      usepursdetail: [this.record.usepursdetail, [Validators.required]],
      dest: [this.record.dest, [Validators.required]],
      dropby: [this.record.dropby],
      drivedist: [this.record.drivedist, [Validators.required, Validators.pattern("[0-9]*")]],
      // accummileage: new FormControl(),
      fueling: [this.record.fueling, [Validators.pattern("[0-9]*")]],
    });


    // 사용 일자 input box 내 default 로 오늘 날짜를 기입하기 위한 기능
    const today = new Date();
    const oneWeekAgo = new Date();
    // 시작일 input-box 내 값을 일주일 전으로 셋팅
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    this.historyInputForm.controls['datefrom'].setValue(oneWeekAgo);
    this.historyInputForm.controls['dateto'].setValue(today);
    this.fromDateChange(oneWeekAgo);
    this.toDateChange(today);
  }

  // html 내에서 Form Control 소스 입력 시 간단히 쓸 수 있도록 get function 으로 생성 후 활용
  get f() { return this.historyInputForm.controls; }


  // sever 와의 통신을 위한 date form 변경
  transformDate(date) {
    return this.datePipe.transform(date, 'yyyyMMdd');
  }

  // datepicker 유효성 검사를 위하여 input-box 에 들어온 날짜를 위에 선언 된 datefrom 변수에 담아서 html 에서 활용할 수 있도록 함
  fromDateChange(inputDate) {
    this.datefrom = inputDate;
  }

  // datepicker 유효성 검사를 위하여 input-box 에 들어온 날짜를 위에 선언 된 datefrom 변수에 담아서 html 에서 활용할 수 있도록 함
  toDateChange(inputDate) {
    this.dateto = inputDate;
  }

  // 차량선택 drop-box 내 List 설정
  getCaridList() {
    this.service.getCaridSelectionList()
      .subscribe(
        this.getCaridListOk(),
        this.getCaridListError()
      );
  }

  // 사용유형 drop-box 내 List 설정
  getUsePursList() {
    this.service.getUsePursSelectionList()
      .subscribe(
        this.getUsePursListOk(),
        this.getUsePursListError()
      );
  }

  // 사용형태 drop-box 내 List 설정
  getUseTypeList() {
    this.service.getUseTypeSelectionList()
      .subscribe(
        this.getUseTypeListOk(),
        this.getUseTypeListError()
      );
  }

  // 서버로 부터 받아온 response SelectionListModel 배열에 담아 html 에서 사용할 수 있도록 함.
  // 또한, drop-box 형태의 input-box 들에 default 값으로 "-선택-" 을 넣어주기 위하여 임의의 값(-1)을 지정하여 초기화 해주게 됨
  getCaridListOk() {
    return (res => {
      this.historyInputForm.controls['carid'].setValue("-1");
      this.caridList = res;
    });
  }

  getUsePursListOk() {
    // return (res: SelectionListModel[]) => this.usePursList = res;
    return (res => {
      this.historyInputForm.controls['usepurs'].setValue("-1");
      this.usePursList = res;
    });
  }

  getUseTypeListOk() {
    return (res => {
      this.historyInputForm.controls['usetype'].setValue("-1");
      this.useTypeList = res;
    });
  }

  // 서버 통신 시, error 처리
  getCaridListError() {
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

    this.submitted = true;

    // stop here if form is invalid
    if (this.historyInputForm.invalid) {
      return alert('입력 조건을 확인하세요.');
    }

    // server 쪽에서 date data 를 받을 때, yyyy-mm-dd 형태로 받게 되어 있으므로, 해당 형태로 날짜를 변환해서 보내기 위함
    this.historyInputForm.controls['datefrom'].setValue(this.transformDate(this.historyInputForm.controls['datefrom'].value));
    this.historyInputForm.controls['dateto'].setValue(this.transformDate(this.historyInputForm.controls['dateto'].value));

    // drop-box 형태의 input-box 들에 default 값으로 "-선택-" 을 넣어주기 위하여 임의의 값(-1)을 지정하여 초기화 해주게 됨
    // 그러나 실제로 server 통신 시, "-선택" 값이 전송/저장 되면 안되므로 조건문을 통하여 -1 값일 경우엔 차량 선택하라는 alert 실행
    if (this.historyInputForm.controls['carid'].value == "-1") {
      alert('차량을 선택해 주세요.');
    } else if (this.historyInputForm.controls['usetype'].value == "-1") {
      alert('사용형태를 선택해 주세요.');
    } else if (this.historyInputForm.controls['usepurs'].value == "-1") {
      alert('사용유형을 선택해 주세요.');
    } else {
      this.service.addInputData(this.historyInputForm.value);
    }

    // this.historyInputForm.reset();
  }

  // 닫기 기능, main page 로 리다이렉션
  close(): void {
    this.service.goToMainPage();
  }

}


