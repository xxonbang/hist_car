import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { InputFieldsModel } from '../input-fields-model';
import { RecordService } from '../record.service';

import { DatePipe } from '@angular/common';

import { SelectionListModel } from '../selection-list-model';

@Component({
  selector: 'app-history-search',
  templateUrl: './history-search.component.html',
  styleUrls: ['./history-search.component.css'],
  providers: [DatePipe]
})

export class HistorySearchComponent implements OnInit {

  // index: FormGroup;
  // Angular Reactive Form Group 사용을 위한 선언
  historyInputForm: FormGroup;

  // 차량조희 input box 내 List 설정용 프로퍼티
  caridList: SelectionListModel[];

  // 모든 input box 에 대한 하나의 입력 값들을 받게 될 record 변수를 InputFieldsModel 타입으로 생성
  record = new InputFieldsModel();
  // 모든 기록에 대한 검색 결과를 담을 allRecords 변수를 inputFieldsModel 타입의 배열로 생성
  allRecords: InputFieldsModel[];

  // table 의 header 부분 컬럼들 셋팅
  displayedColumns: string[] = ['select', 'seq', 'datefrom', 'dateto', 'driverdept',
    'drivernm', 'usetype', 'usepurs', 'usepursdetail', 'drivedist', 'accummileage', 'dest', 'dropby', 'fueling', 'carid'];
  // table 의 data 들에 대한 source
  dataSource = new MatTableDataSource(this.allRecords);
  // 체크박스용
  selection = new SelectionModel<InputFieldsModel>(true, []);

  useTypeList: SelectionListModel[];
  usePursList: SelectionListModel[];

  // 날짜 제한을 위해 사용
  datefrom: Date;
  dateto: Date;
  requestParam = { datefrom: '', dateto: '', carid: '' };

  constructor(
    // 날짜를 yyyy-mm-dd 형태로 구현해 주기 위한 DatePipe 생성
    private datePipe: DatePipe,
    // RecordService 사용을 위한 sevice 생성
    private service: RecordService
  ) { }

  // table sort
  @ViewChild(MatSort) sort: MatSort;
  // table pagination
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    // table 내 sort 기능을 위한 선언
    this.dataSource.sort = this.sort;

    // table 의 paginator 기능을 위한 선언
    this.dataSource.paginator = this.paginator;

    // page 내 input box 들에 대한 Form 선언
    this.historyInputForm = new FormGroup({
      datefrom: new FormControl(),
      dateto: new FormControl(),
      carid: new FormControl()
    });

    // 사용 일자 input box 내 default 로 오늘 날짜를 기입하기 위한 기능
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    this.historyInputForm.controls['datefrom'].setValue(oneWeekAgo);
    this.historyInputForm.controls['dateto'].setValue(today);
    this.fromDateChange(oneWeekAgo);
    this.toDateChange(today);

    // 페이지 loading 시 차량목록을 drop-box 에 바로 loading 해주기 위하여 ngOnInit에 포함
    this.getCaridList();

    // List 출력 시, usetype 과 usepurs 를 화면에 code 말고 name 값으로 출력해주기 위하여 List들을 불러옴 -> html 에서 비교 연산을 통해 변경된 값 출력
    this.getUseTypeList();
    this.getUsePursList();
  }

  // 차량선택 input box 내 List 조회용, Page 생성 시 차량목록을 서버에 요청 및 응답 받아 화면 drop-box 내에 표시
  getCaridList() {
    this.service.getCaridSelectionList()
      .subscribe(
        this.getCaridListOk(),
        this.getCaridListError()
      );
  }

  getUseTypeList() {
    this.service.getUseTypeSelectionList()
      .subscribe(
        this.getUseTypeListOk(),
        this.getUseTypeListError()
      );
  }

  getUsePursList() {
    this.service.getUsePursSelectionList()
      .subscribe(
        this.getUsePursListOk(),
        this.getUsePursListError()
      );
  }

  // server 와의 통신을 위해 date format 변경
  transformDate(date) {
    return this.datePipe.transform(date, 'yyyyMMdd');
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
    return (res: SelectionListModel[]) => this.usePursList = res;
  }

  // drop-box 형태의 input-box 들에 default 값으로 "-선택-" 을 넣어주기 위하여 임의의 값(-1)을 지정하여 초기화 해주게 됨
  getUseTypeListOk() {
    return (res: SelectionListModel[]) => this.useTypeList = res;
  }

  // 서버 통신 시, error 처리
  getCaridListError() {
    return (error) => console.log(error);
  }

  getUsePursListError() {
    return error => console.log(error);
  }

  getUseTypeListError() {
    return error => console.log(error);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: InputFieldsModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.drivernm + 1}`;
  }

  // 전체 검색 기능
  search() {
    this.service.getRecord()
      .subscribe(
        this.searchRecordListOK(),
        this.searchRecordListErr()
      );
  }

  // 조건 검색 기능
  getRecordsByConditions() {
    this.service.getRecordsByConditions(this.requestParam)
      .subscribe(
        (res) => {
          if (res.length > 0) {
            this.dataSource.data = res;
          } else {
            // 검색 조건에 해당하는 값이 없을 수 있음, 메세지 불필요 해 보임
            alert('검색조건을 확인하세요');
          }
        }
      );
  }

  // search 기능 OK 시 res 값을 dataSource 에 넣어줌
  searchRecordListOK() {
    return (res) => this.dataSource.data = res;
  }

  // search 기능 err 수행
  searchRecordListErr() {
    return (error) => console.log(error);
  }

  // 닫기 기능, main page로 리다이렉션
  close(): void {
    this.service.goToMainPage();
  }

  // 1. html 내에서 시작일과 종료일 사이 유효성 검사를 위하여 화면의 datepicker에 설정된 날짜 값을 받아오고, 그 값을 date 타입의 datefrom 변수에 넣음
  // (ngModelChange)를 통해 화면의 datepicker 의 날짜가 변경 될 때에 $event 값을 fromDateChange() 에 실시간으로 method invoke 실행
  // 2. server 와의 통신 시 yyyy-mm-dd 형태로 통신해야 하므로 서버로 보내는 date 형태를 transformDate 하여 통신에 사용할 requestParam.datefrom 변수에 넣는다.
  // 즉, datefrom 변수는 화면의 유효성 검사에 활용하기 위하여 선언 되는 date 값, requestParam.datefrom 은 server 와의 통신을 위하여 타입이 변경되어 선언되는 date 값.
  fromDateChange(inputDate) {
    this.datefrom = inputDate;
    this.requestParam.datefrom = this.transformDate(inputDate);
  }

  toDateChange(inputDate) {
    this.dateto = inputDate;
    this.requestParam.dateto = this.transformDate(inputDate);
  }

  histcarChange(inputCar) {
    this.requestParam.carid = inputCar;
  }

}
