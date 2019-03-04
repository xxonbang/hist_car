import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryInputComponent } from './history-input.component';

describe('HistoryInputComponent', () => {
  let component: HistoryInputComponent;
  let fixture: ComponentFixture<HistoryInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
