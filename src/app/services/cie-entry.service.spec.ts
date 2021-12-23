import { TestBed } from '@angular/core/testing';

import { CieEntryService } from './cie-entry.service';

describe('CieEntryService', () => {
  let service: CieEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CieEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
