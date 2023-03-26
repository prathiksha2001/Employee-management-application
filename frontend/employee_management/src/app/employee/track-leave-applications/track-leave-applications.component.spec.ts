import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackLeaveApplicationsComponent } from './track-leave-applications.component';

describe('TrackLeaveApplicationsComponent', () => {
  let component: TrackLeaveApplicationsComponent;
  let fixture: ComponentFixture<TrackLeaveApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackLeaveApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackLeaveApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
