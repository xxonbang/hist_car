import { Component, OnInit } from '@angular/core';
import {FormControl } from '@angular/forms'; 

@Component({
  selector: 'app-history-input',
  templateUrl: './history-input.component.html',
  styleUrls: ['./history-input.component.css']
})
export class HistoryInputComponent implements OnInit {
  // status = 'active';

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor() { }

  ngOnInit() {
  }

}
