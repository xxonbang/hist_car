import { Component, OnInit } from '@angular/core';
import { CommonModel } from '../common-model';
import { DatePipe } from '@angular/common';
import { RecordService } from '../record.service'
@Component({
  selector: 'app-history-input',
  templateUrl: './history-input.component.html',
  styleUrls: ['./history-input.component.css'],
  providers: [DatePipe]
})
export class HistoryInputComponent implements OnInit {

  // 모든 input box 에 대한 입력 값들을 받게 될 record 변수를 CommonModel 타입으로 생성
  record = new CommonModel();
  recordList: CommonModel[];

  // 차량조희 input box 내 List 설정용 프로퍼티
  histCarList;
  // 사용목적 input box 내 List 설정용 프로퍼티
  useTypeList;

  // carList = [
  //   { key: 1, value: '12하1234 (소렌토)' },
  //   { key: 2, value: '56하7890 (아반떼)' },
  //   { key: 3, value: '53서2493 (투싼)' }
  // ];


  constructor(
    private service: RecordService,
    private datePipe: DatePipe
  ) { }


  ngOnInit() {
    this.record.dateFrom = new Date();
    this.record.dateTo = new Date();

    this.setSubscribe();
  }

  // setInputData() {
  //   this.service.setParamData(this.record);
  // }

  // sever 와의 통신을 위한 date form 변경
  transformDate(date) {
    return this.datePipe.transform(date, 'yyyyMMdd');
  }

  // 차량선택 input box 내 List 조회용
  getHistCarList() {
    const ok = (res => {
      let temp = res;
      const histCarList = new Map<string, string>();
      histCarList.set('', '- 선택 -');
      for (var i = 0; temp.length > i; i++) {
        let curTemp = temp[i];
        histCarList.set(curTemp.authId, curTemp.authNm);
      }
      this.service.histCarList$.emit(histCarList);
    });

    const err = (error => {
      alert(error);
    });

    this.service.getInputSelectionList(ok, err);
  }

  // 사용유형 input box 내 List 조회용
  getuseTypeList() {
    const ok = (res => {
      let temp = res;
      const useTypeList = new Map<string, string>();
      useTypeList.set('', '- 선택 -');
      for (var i = 0; temp.length > i; i++) {
        let curTemp = temp[i];
        useTypeList.set(curTemp.authId, curTemp.authNm);
      }
      this.service.useTypeList$.emit(useTypeList);
    });

    const err = (error => {
      alert(error);
    });

    this.service.getInputSelectionList(ok, err);
  }

  // server 에서 받아 온 차량목록 List 와 사용목적 List 를 input box 로 전달해주는 subscribing
  setSubscribe() {
    this.service.histCarList$.subscribe((histCar) => { this.histCarList = histCar; });
    this.service.useTypeList$.subscribe((useType) => { this.useTypeList = useType; });
  }

  // 입력 완료 button 클릭 시, 기능 수행
  // inputFrom.value 값을 받아와 sevice의 addInputData 로 전달 후, subscribe 콜백 함수로 받아온 data를 recordList 배열에 추가
  add(inputData: CommonModel): void {
    if (!inputData) { return; }
    this.service.addInputData(inputData)
      .subscribe(data => {
        this.recordList.push(data);
      });
  }

  close(): void {

  }

}
