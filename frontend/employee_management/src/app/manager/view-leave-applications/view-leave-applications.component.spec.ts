import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeaveApplicationsComponent } from './view-leave-applications.component';

describe('ViewLeaveApplicationsComponent', () => {
  let component: ViewLeaveApplicationsComponent;
  let fixture: ComponentFixture<ViewLeaveApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLeaveApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLeaveApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
