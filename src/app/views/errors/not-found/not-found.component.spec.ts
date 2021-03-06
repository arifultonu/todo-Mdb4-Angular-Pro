import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NotFoundComponent ],
      imports: [MDBBootstrapModulesPro],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
