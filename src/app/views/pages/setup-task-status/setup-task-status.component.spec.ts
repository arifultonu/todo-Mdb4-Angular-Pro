import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupTaskStatusComponent } from './setup-task-status.component';

describe('SetupTaskStatusComponent', () => {
  let component: SetupTaskStatusComponent;
  let fixture: ComponentFixture<SetupTaskStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupTaskStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupTaskStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
