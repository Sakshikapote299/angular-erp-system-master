import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './components/header/header.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { LeaveComponent } from './components/leave/leave.component';
import { NotificationComponent } from './components/notification/notification.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MeetingsComponent } from './components/meetings/meetings.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { AuthComponent } from './components/auth/auth.component';
import { SyllabusComponent } from './components/syllabus/syllabus.component';
import { SyllabusListComponent } from './components/syllabus-list/syllabus-list.component';
import { EseSchedulerComponent } from './components/ese-scheduler/ese-scheduler.component';
import { EseListComponent } from './components/ese-list/ese-list.component';
import { CieEntryComponent } from './components/cie-entry/cie-entry.component';
import { CieMarksListComponent } from './components/cie-marks-list/cie-marks-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ScheduleComponent,
    LeaveComponent,
    NotificationComponent,
    MeetingsComponent,
    NotificationListComponent,
    AuthComponent,
    SyllabusComponent,
    SyllabusListComponent,
    EseSchedulerComponent,
    EseListComponent,
    CieEntryComponent,
    CieMarksListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
