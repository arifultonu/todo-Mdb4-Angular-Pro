import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistrationModalComponent } from './user-registration-modal.component';

describe('UserRegistrationModalComponent', () => {
  let component: UserRegistrationModalComponent;
  let fixture: ComponentFixture<UserRegistrationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRegistrationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
