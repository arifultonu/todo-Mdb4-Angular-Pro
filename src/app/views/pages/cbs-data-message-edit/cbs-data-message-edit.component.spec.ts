import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbsDataMessageEditComponent } from './cbs-data-message-edit.component';

describe('CbsDataMessageEditComponent', () => {
  let component: CbsDataMessageEditComponent;
  let fixture: ComponentFixture<CbsDataMessageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CbsDataMessageEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CbsDataMessageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
