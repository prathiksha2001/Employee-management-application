import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { EmployeeRegistrationComponent } from './admin/employee-registration/employee-registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { AssignManagerComponent } from './admin/assign-manager/assign-manager.component';
import { ViewEmployeesComponent } from './admin/view-employees/view-employees.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ManagerComponent } from './manager/manager.component';
import { ViewEmployeeDetailsComponent } from './manager/view-employee-details/view-employee-details.component';
import { AssignTaskComponent } from './manager/assign-task/assign-task.component';
import { ViewLeaveApplicationsComponent } from './manager/view-leave-applications/view-leave-applications.component';
import { ViewTaskUpdatesComponent } from './manager/view-task-updates/view-task-updates.component';
import { EmployeeComponent } from './employee/employee.component';
import { ApplyLeaveComponent } from './employee/apply-leave/apply-leave.component';
import { TrackLeaveApplicationsComponent } from './employee/track-leave-applications/track-leave-applications.component';
import { ViewTasksComponent } from './employee/view-tasks/view-tasks.component';
import { ViewLeaveBalanceComponent } from './employee/apply-leave/view-leave-balance/view-leave-balance.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ProfileComponent } from './profile/profile.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { PersonalInfoComponent } from './profile/personal-info/personal-info.component';
import { ProfessionalDetailsComponent } from './profile/professional-details/professional-details.component';
// import { AddDepartmentComponent } from './admin/add-department/add-department.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AddDepartmentComponent } from './admin/assign-manager-department/add-department/add-department.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', 
  component: AdminComponent, 
  children: [
    { path: '', redirectTo: 'view-personal-profile', pathMatch: 'full' },
    { path: 'view-personal-profile', component: ProfileComponent },
    { path: 'all-employees', component: ViewEmployeesComponent },
    { path: 'employee-registration', component: EmployeeRegistrationComponent },    
    { path: 'assign-manager', component: AssignManagerComponent },
    // { path: 'view-department', component: AddDepartmentComponent }
  ]},
  { path: 'manager', component: ManagerComponent,
    children: [{ path: '', redirectTo: 'view-personal-profile', pathMatch: 'full' },
    { path: 'view-personal-profile', component: ProfileComponent },
    { path: 'view-employee-details', component: ViewEmployeeDetailsComponent },
    { path: 'assign-task', component: AssignTaskComponent },    
    { path: 'view-leave-applications', component: ViewLeaveApplicationsComponent },
    { path: 'view-task-updates', component: ViewTaskUpdatesComponent },
    { path: 'view-task', component: ViewTasksComponent },
    { path: 'apply-leave', component: ApplyLeaveComponent },    
    { path: 'track-leave-application', component: TrackLeaveApplicationsComponent }
  ]},
  { path: 'employee', component: EmployeeComponent,
  children: [
    { path: '', redirectTo: 'view-personal-profile', pathMatch: 'full' },
    { path: 'view-personal-profile', component: ProfileComponent },
    { path: 'view-task', component: ViewTasksComponent },
    { path: 'apply-leave', component: ApplyLeaveComponent },    
    { path: 'track-leave-application', component: TrackLeaveApplicationsComponent }
  ]
},
  { path: 'profile', component: ProfileComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    EmployeeRegistrationComponent,
    AssignManagerComponent,
    ViewEmployeesComponent,
    ManagerComponent,
    ViewEmployeeDetailsComponent,
    AssignTaskComponent,
    ViewLeaveApplicationsComponent,
    ViewTaskUpdatesComponent,
    EmployeeComponent,
    ApplyLeaveComponent,
    TrackLeaveApplicationsComponent,
    ViewTasksComponent,
    ViewLeaveBalanceComponent,
    ProfileComponent,
    PersonalInfoComponent,
    ProfessionalDetailsComponent,
    AddDepartmentComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    [RouterModule.forRoot(routes)],
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatSelectModule,
    MatGridListModule
  ],
  exports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
