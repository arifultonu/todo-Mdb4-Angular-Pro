import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinallySendMessageComponent } from './finally-send-message.component';

describe('FinallySendMessageComponent', () => {
  let component: FinallySendMessageComponent;
  let fixture: ComponentFixture<FinallySendMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinallySendMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinallySendMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
