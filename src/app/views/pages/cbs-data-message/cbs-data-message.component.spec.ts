import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbsDataMessageComponent } from './cbs-data-message.component';

describe('CbsDataMessageComponent', () => {
  let component: CbsDataMessageComponent;
  let fixture: ComponentFixture<CbsDataMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CbsDataMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CbsDataMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
