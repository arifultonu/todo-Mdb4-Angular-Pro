import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingSwiftMessageComponent } from './incoming-swift-message.component';

describe('IncomingSwiftMessageComponent', () => {
  let component: IncomingSwiftMessageComponent;
  let fixture: ComponentFixture<IncomingSwiftMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomingSwiftMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingSwiftMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
