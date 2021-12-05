import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingMessageAuthorizationComponent } from './outgoing-message-authorization.component';

describe('AuthorizationComponent', () => {
  let component: OutgoingMessageAuthorizationComponent;
  let fixture: ComponentFixture<OutgoingMessageAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutgoingMessageAuthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoingMessageAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
