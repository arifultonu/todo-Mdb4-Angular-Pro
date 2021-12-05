import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingMessageAuthorizationDetailsComponent } from './outgoing-message-authorization-details.component';

describe('OutgoingMessageAuthorizationDetailsComponent', () => {
  let component: OutgoingMessageAuthorizationDetailsComponent;
  let fixture: ComponentFixture<OutgoingMessageAuthorizationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutgoingMessageAuthorizationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoingMessageAuthorizationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
