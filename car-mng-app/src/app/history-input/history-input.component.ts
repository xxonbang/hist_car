import { Component, OnInit } from '@angular/core';
import { RecordModel } from '../record-model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-history-input',
  templateUrl: './history-input.component.html',
  styleUrls: ['./history-input.component.css'],
  providers: [DatePipe]
})
export class HistoryInputComponent implements OnInit {

  record = new RecordModel();

  carList = [
    { key: 1, value: '12하1234 (소렌토)' },
    { key: 2, value: '56하7890 (아반떼)' },
    { key: 3, value: '53서2493 (투싼)' }
  ];


  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
    this.record.dateFrom = new Date();
    this.record.dateTo = new Date();
  }

  // setInputData() {
  //   this.service.setParamData(this.record);
  // }

  transformDate(date) {
    return this.datePipe.transform(date, 'yyyyMMdd');
  }

}
