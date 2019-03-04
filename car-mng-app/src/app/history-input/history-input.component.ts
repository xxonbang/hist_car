import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-input',
  templateUrl: './history-input.component.html',
  styleUrls: ['./history-input.component.css']
})
export class HistoryInputComponent implements OnInit {
  status = 'active';

  constructor() { }

  ngOnInit() {
  }

}
