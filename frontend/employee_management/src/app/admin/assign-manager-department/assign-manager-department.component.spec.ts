import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignManagerDepartmentComponent } from './assign-manager-department.component';

describe('AssignManagerDepartmentComponent', () => {
  let component: AssignManagerDepartmentComponent;
  let fixture: ComponentFixture<AssignManagerDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignManagerDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignManagerDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
