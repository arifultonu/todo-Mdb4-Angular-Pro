import { TestBed } from '@angular/core/testing';

import { CbsDataMessageService } from './cbs-data-message.service';

describe('CbsDataMessageService', () => {
  let service: CbsDataMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbsDataMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
