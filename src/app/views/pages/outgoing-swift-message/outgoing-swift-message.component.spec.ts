import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingSwiftMessageComponent } from './outgoing-swift-message.component';

describe('OutgoingSwiftMessageComponent', () => {
  let component: OutgoingSwiftMessageComponent;
  let fixture: ComponentFixture<OutgoingSwiftMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutgoingSwiftMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoingSwiftMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
