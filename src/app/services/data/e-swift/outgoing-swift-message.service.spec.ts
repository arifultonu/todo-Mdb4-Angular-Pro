import { TestBed } from '@angular/core/testing';

import { OutgoingSwiftMessageService } from './outgoing-swift-message.service';

describe('OutgoingSwiftMessageService', () => {
  let service: OutgoingSwiftMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutgoingSwiftMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
