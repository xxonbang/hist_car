import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-history-search',
  templateUrl: './history-search.component.html',
  styleUrls: ['./history-search.component.css']
})
export class HistorySearchComponent implements OnInit {

  displayedColumns: string[] = ['useDate', 'driverDep', 'driverNm', 'bizOrNot', 'useType', 'usePurpose', 'mileage', 'accumMileage', 'destination', 'dropBy', 'fueling'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  useDate: string;
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
  { useDate: '2019-03-22', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { useDate: '2019-03-22', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { useDate: '2019-03-22', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { useDate: '2019-03-22', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { useDate: '2019-03-22', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { useDate: '2019-03-22', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { useDate: '2019-03-22', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { useDate: '2019-03-22', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { useDate: '2019-03-22', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { useDate: '2019-03-22', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { useDate: '2019-03-22', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { useDate: '2019-03-22', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
  { useDate: '2019-03-22', driverDep: 'APP서비스그룹', driverNm: '손병철', bizOrNot: '업무용', useType: '회의 참석', usePurpose: '발주처 워크샵 참여', mileage: 5, accumMileage: 2000, destination: '속초', dropBy: '명동', fueling: 60 },
];