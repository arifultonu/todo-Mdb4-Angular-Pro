import { TestBed } from '@angular/core/testing';

import { OutgoingMessageAuthorizationService } from './outgoing-message-authorization.service';

describe('OutgoingMessageAuthorizationService', () => {
  let service: OutgoingMessageAuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutgoingMessageAuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
