import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueSwiftMessageComponent } from './queue-swift-message.component';

describe('QueueSwiftMessageComponent', () => {
  let component: QueueSwiftMessageComponent;
  let fixture: ComponentFixture<QueueSwiftMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueueSwiftMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueSwiftMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
