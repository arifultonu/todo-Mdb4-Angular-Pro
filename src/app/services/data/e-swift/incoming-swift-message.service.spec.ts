import { TestBed } from '@angular/core/testing';

import { IncomingSwiftMessageService } from './incoming-swift-message.service';

describe('IncomingSwiftMessageService', () => {
  let service: IncomingSwiftMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomingSwiftMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
