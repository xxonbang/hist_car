import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // activateClass(subMenu){
  //   subMenu.active = !subMenu.active;    
  // }

  public curUrl;
  public ref;
  public _router;

  constructor(private changeDetector: ChangeDetectorRef, private router: Router) {
    this._router = router;
    this.ref = changeDetector;


    // this.ref.detectChanges();
  }

  ngOnInit() {
    console.log(this._router.url);
    //this.curUrl = this.router.url;
  }

  clickFunc() {
    console.log(this._router.url);
    //this.curUrl = this.router.url;
  }

  // constructor() {
  //   this.subMenus = [
  //     {name: '사용내역 입력'},
  //     {name: '사용내역 검색'},
  //     {name: '차량관리'},
  //   ];    
  // }
}
