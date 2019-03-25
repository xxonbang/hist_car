import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { RecordModel } from '../record-model';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history-search',
  templateUrl: './history-search.component.html',
  styleUrls: ['./history-search.component.css'],
  providers: [DatePipe]
})

export class HistorySearchComponent implements OnInit {

  record = new RecordModel();

  displayedColumns: string[] = ['select', 'dateFrom', 'dateTo', 'driverDep', 'driverNm', 'bizOrNot', 'useType', 'usePurpose', 'mileage', 'accumMileage', 'destination', 'dropBy', 'fueling'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  constructor(private datePipe: DatePipe) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.record.dateFrom = new Date();
    this.record.dateTo = new Date();
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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.dateFrom + 1}`;
  }
}


export interface PeriodicElement {
  dateFrom: string;
  dateTo: string;
  driverDep: string;
  driverNm: string;
  bizOrNot: string;
  useType: string;
  usePurpose: string;
  mileage: number;
  accumMileage: number;
  destination: string;
  dropBy: string;
  fueling: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { dateFrom: '2019-03-22', dateTo: '2019-03-23', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { dateFrom: '2019-03-22', dateTo: '2019-03-23', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { dateFrom: '2019-03-22', dateTo: '2019-03-23', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { dateFrom: '2019-03-22', dateTo: '2019-03-23', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { dateFrom: '2019-03-22', dateTo: '2019-03-23', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { dateFrom: '2019-03-22', dateTo: '2019-03-23', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { dateFrom: '2019-03-22', dateTo: '2019-03-23', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { dateFrom: '2019-03-22', dateTo: '2019-03-23', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { dateFrom: '2019-03-22', dateTo: '2019-03-23', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { dateFrom: '2019-03-22', dateTo: '2019-03-23', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { dateFrom: '2019-03-22', dateTo: '2019-03-23', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { dateFrom: '2019-03-22', dateTo: '2019-03-23', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { dateFrom: '2019-03-22', dateTo: '2019-03-23', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { dateFrom: '2019-03-22', dateTo: '2019-03-23', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { dateFrom: '2019-03-22', dateTo: '2019-03-23', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { dateFrom: '2019-03-22', dateTo: '2019-03-23', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { dateFrom: '2019-03-22', dateTo: '2019-03-23', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { dateFrom: '2019-03-22', dateTo: '2019-03-23', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },



];