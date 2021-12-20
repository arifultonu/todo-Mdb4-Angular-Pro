import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupTaskPriorityComponent } from './setup-task-priority.component';

describe('SetupTaskPriorityComponent', () => {
  let component: SetupTaskPriorityComponent;
  let fixture: ComponentFixture<SetupTaskPriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupTaskPriorityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupTaskPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
