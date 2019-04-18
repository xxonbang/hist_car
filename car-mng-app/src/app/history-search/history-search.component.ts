import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

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
  histCarList: SelectionListModel[];

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
  requestParam = {datefrom: '', dateto: '', carid: ''};

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

    // 페이지 loading 시 차량목록을 drop-box 에 바로 loading 해주기 위하여 ngOnInit에 포함
    this.getHistCarList();

    // table 의 paginator 기능을 위한 선언
    this.dataSource.paginator = this.paginator;

    // page 내 input box 들에 대한 Form 선언
    this.historyInputForm = new FormGroup({
      datefrom: new FormControl(),
      dateto: new FormControl(),
      histCar: new FormControl()
    });

    // 사용 일자 input box 내 default 로 오늘 날짜를 기입하기 위한 기능
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    this.historyInputForm.controls['datefrom'].setValue(oneWeekAgo);
    this.historyInputForm.controls['dateto'].setValue(today);
    this.fromDateChange(oneWeekAgo);
    this.toDateChange(today);

    this.getUseTypeList();
    this.getUsePursList();
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

  getUsePursListError() {
    return error => console.log(error);
  }

  getUsePursListOk() {
    return (res: SelectionListModel[]) => this.usePursList = res;
  }

  getUseTypeListOk() {
    return (res: SelectionListModel[]) => this.useTypeList = res;
  }

  getUseTypeListError() {
    return error => console.log(error);
  }

  // setSubscribe() {

  //   this.service.carUseHist$.pipe().subscribe(res => {
  //     console.dir('### setSubscribe is working!!');
  //     // res
  //     this.dataSource.data = res;

  //     // this.TABLE_DATA = res;
  //   });
  // }

  // 차량선택 input box 내 List 조회용, Page 생성 시 차량목록을 서버에 요청 및 응답 받아 화면 drop-box 내에 표시
  getHistCarList() {
    this.service.getHistCarSelectionList()
      .subscribe(
        this.getHistCarListOk(),
        this.getHistCarListError()
      );
  }

  // 서버로 부터 받아온 response SelectionListModel 배열에 담아 html 에서 사용할 수 있도록 함.
  getHistCarListOk() {
    return (res: SelectionListModel[]) => this.histCarList = res;
  }
  // 서버 통신 시, error 처리
  getHistCarListError() {
    return (error) => console.log(error);
  }

  // server 와의 통신을 위해 date format 변경
  transformDate(date) {
    return this.datePipe.transform(date, 'yyyyMMdd');
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

  // search 버튼 클릭 시, service의 getRecord()를 호출 -> res 값을 받아와 OK 와 Err 로 전달
  // search() {
  //   this.service.getRecord()
  //     .subscribe(
  //       this.searchRecordListOK(),
  //       this.searchRecordListErr()
  //     )
  // }

  search() {

    //   const ok = (res => {
    //     this.searchRecordListOK();
    //   });
    //   const err =(res => {
    //     this.searchRecordListErr();
    //   });

    //   this.service.setSearchConditions(this.historyInputForm.value)
    //     .subscribe(ok, err)
    // }

    this.service.getRecord()
      .subscribe(
        this.searchRecordListOK(),
        this.searchRecordListErr()
      );

    // this.service.setSearchConditions(this.historyInputForm.value)
    //   .subscribe((res: InputFieldsModel[]) => {
    //     let res = res;
    //     this.searchRecordListOK(res),
    //       this.searchRecordListErr(res)
    //   });
  }

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

  // 닫기 기능 호출, localStorage 내 'accessToken' 정보를 제거하고 login Page로 리다이렉션
  close(): void {
    this.service.goToMainPage();
  }

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
