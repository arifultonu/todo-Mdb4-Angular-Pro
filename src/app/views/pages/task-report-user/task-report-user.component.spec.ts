import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskReportUserComponent } from './task-report-user.component';

describe('TaskReportUserComponent', () => {
  let component: TaskReportUserComponent;
  let fixture: ComponentFixture<TaskReportUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskReportUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskReportUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
