import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScheduleComponent} from './components/schedule/schedule.component'
import {LeaveComponent} from './components/leave/leave.component'
import {NotificationComponent} from './components/notification/notification.component'
import { MeetingsComponent } from './components/meetings/meetings.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { AuthComponent } from './components/auth/auth.component';
import { SyllabusComponent } from './components/syllabus/syllabus.component';
import { SyllabusListComponent } from './components/syllabus-list/syllabus-list.component';
import { EseSchedulerComponent } from './components/ese-scheduler/ese-scheduler.component';
import { EseListComponent } from './components/ese-list/ese-list.component';
import { CieEntryComponent } from './components/cie-entry/cie-entry.component';
import { CieMarksListComponent } from './components/cie-marks-list/cie-marks-list.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'syllabus', component: SyllabusComponent },
  { path: 'leave', component: LeaveComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'meetings', component: MeetingsComponent },
  { path: 'notifications-list', component: NotificationListComponent },
  { path: 'syllabus-list', component: SyllabusListComponent },
  { path: 'cie-marks-list', component: CieMarksListComponent },
  { path: 'ese-list', component: EseListComponent },
  { path: 'scheduler', component: EseSchedulerComponent },
  { path: 'cie-entry', component: CieEntryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
