import { TestBed } from '@angular/core/testing';

import { FinallySendMessageService } from './finally-send-message.service';

describe('FinallySendMessageService', () => {
  let service: FinallySendMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinallySendMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
