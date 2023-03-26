import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskUpdatesComponent } from './view-task-updates.component';

describe('ViewTaskUpdatesComponent', () => {
  let component: ViewTaskUpdatesComponent;
  let fixture: ComponentFixture<ViewTaskUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTaskUpdatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTaskUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
