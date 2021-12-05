import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingSwiftMessageEditComponent } from './outgoing-swift-message-edit.component';

describe('OutgoingSwiftMessageEditComponent', () => {
  let component: OutgoingSwiftMessageEditComponent;
  let fixture: ComponentFixture<OutgoingSwiftMessageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutgoingSwiftMessageEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoingSwiftMessageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
