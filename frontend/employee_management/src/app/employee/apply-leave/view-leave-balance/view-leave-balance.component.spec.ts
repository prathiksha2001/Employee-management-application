import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeaveBalanceComponent } from './view-leave-balance.component';

describe('ViewLeaveBalanceComponent', () => {
  let component: ViewLeaveBalanceComponent;
  let fixture: ComponentFixture<ViewLeaveBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLeaveBalanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLeaveBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
