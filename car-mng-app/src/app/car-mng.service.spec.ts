import { TestBed } from '@angular/core/testing';

import { CarMngService } from './car-mng.service';

describe('CarMngService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarMngService = TestBed.get(CarMngService);
    expect(service).toBeTruthy();
  });
});
