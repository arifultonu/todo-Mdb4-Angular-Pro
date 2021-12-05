import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitSuccessMessageComponent } from './submit-success-message.component';

describe('SubmitSuccessMessageComponent', () => {
  let component: SubmitSuccessMessageComponent;
  let fixture: ComponentFixture<SubmitSuccessMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitSuccessMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitSuccessMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
