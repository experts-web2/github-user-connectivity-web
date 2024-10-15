import { TestBed } from '@angular/core/testing';

import { ConectivityService } from './conectivity.service';

describe('ConectivityService', () => {
  let service: ConectivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConectivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
