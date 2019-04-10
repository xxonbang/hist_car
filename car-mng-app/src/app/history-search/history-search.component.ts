import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { InputFieldsModel } from '../input-fields-model';
import { RecordService } from '../record.service'

import { DatePipe } from '@angular/common';

import { SelectionListModel } from '../selection-list-model';

@Component({
  selector: 'app-history-search',
  templateUrl: './history-search.component.html',
  styleUrls: ['./history-search.component.css'],
  providers: [DatePipe]
})

export class HistorySearchComponent implements OnInit {

  // Angular Reactive Form Group 사용을 위한 선언
  historyInputForm: FormGroup;

  // 차량조희 input box 내 List 설정용 프로퍼티
  histCarList: SelectionListModel[];

  // 모든 input box 에 대한 입력 값들을 받게 될 record 변수를 InputFieldsModel 타입으로 생성
  record = new InputFieldsModel();
  recordList: InputFieldsModel[];

  // table 의 header 부분 컬럼들 셋팅
  displayedColumns: string[] = ['select', 'dateFrom', 'dateTo', 'driverDept', 'driverNm', 'useType', 'usePurs', 'usePursDetail', 'driveDist', 'accumMileage', 'dest', 'dropby', 'fueling'];
  // table 의 data 들에 대한 source
  dataSource = new MatTableDataSource(this.recordList);
  // 체크박스용
  selection = new SelectionModel<InputFieldsModel>(true, []);


  constructor(
    private datePipe: DatePipe,
    private service: RecordService
  ) { }

  // pagination
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    this.getHistCarList();

    this.dataSource.paginator = this.paginator;
    // this.record.dateFrom = new Date();
    // this.record.dateTo = new Date();

    this.historyInputForm = new FormGroup({
      dateFrom: new FormControl(this.record.dateFrom, [Validators.required]),
      dateTo: new FormControl(),
      histCar: new FormControl()
    });

    const today = new Date();
    this.historyInputForm.controls['dateFrom'].setValue(today);
    this.historyInputForm.controls['dateTo'].setValue(today);
  }

  // 차량선택 input box 내 List 조회용
  getHistCarList() {
    this.service.getHistCarSelectionList()
      .subscribe(
        this.getHistCarListOk(),
        this.getHistCarListError()
      )
  }

  // 서버로 부터 받아온 response SelectionListModel 배열에 담아 html 에서 사용할 수 있도록 함.
  getHistCarListOk() {
    return (res: SelectionListModel[]) => this.histCarList = res;
  }

  // 서버 통신 시, error 처리
  getHistCarListError() {
    return error => console.log(error);
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.driverNm + 1}`;
  }

  search() {
    this.service.getRecord()
      .subscribe(
        this.searchRecordListOK(),
        this.searchRecordListErr()
      )
  }

  searchRecordListOK() {
    return (res: InputFieldsModel[]) => this.recordList = res;
  }

  searchRecordListErr() {
    return error => console.log(error);
  }

}
// export class RecordDataSource extends DataSource<any> {
//   constructor(private service: RecordService) {
//     super();
//   }
//   connect(): Observable<InputFieldsModel[]> {
//     return this.service.getRecord();
//   }
//   disconnect() { }
// }



// TODO : 서버로부터 data를 받아와서 arrary 방식으로 데이터 넣는 코딩 필요
// const TABLE_DATA: InputFieldsModel[] = [

//   { dateFrom: new Date(), dateTo: new Date(), driverDept: 'APP서비스그룹', driverNm: '손병철', useType: '업무용', usePurs: '회의 참석', usePursDetail: '발주처 워크샵 참여', driveDist: 5, accumMileage: 2000, dest: '속초', dropby: '명동', fueling: 60, histCar: '' },

// ];