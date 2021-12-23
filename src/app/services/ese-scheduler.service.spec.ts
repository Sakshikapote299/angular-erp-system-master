import { TestBed } from '@angular/core/testing';

import { EseSchedulerService } from './ese-scheduler.service';

describe('EseSchedulerService', () => {
  let service: EseSchedulerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EseSchedulerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
