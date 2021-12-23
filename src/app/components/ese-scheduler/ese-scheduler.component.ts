import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { department, divs, faculty, programs, schools, semesters, subjects, year } from 'src/app/data';
import { Router } from '@angular/router';
import { EseSchedulerService } from 'src/app/services/ese-scheduler.service';

@Component({
  selector: 'app-ese-scheduler',
  templateUrl: './ese-scheduler.component.html',
  styleUrls: ['./ese-scheduler.component.css']
})
export class EseSchedulerComponent implements OnInit {
  departments = department;
  years = year;
  programs = programs;
  divisions = divs;
  faculties = faculty;
  schools = schools;
  semesters = semesters;
  subjects = subjects;

  departmentControl=new FormControl();
  facultyControl=new FormControl();
  programControl=new FormControl();
  yearControl=new FormControl();
  divisionControl=new FormControl();
  schoolControl = new FormControl();
  semesterControl = new FormControl();
  subjectControl = new FormControl();
  content = new FormControl();
  subjectCode = new FormControl();
  pattern = new FormControl();
  subjectName = new FormControl();
  date=new FormControl(new Date());
  time=new FormControl(`${new Date().getHours().toString()}:${new Date().getMinutes().toString()}`);


  dataSource:any=[]
  displayedColumns: string[] = ['Pattern', 'Subject Code', 'Subject Name', 'Date', 'Time'];
  add() {
    if(this.subjectCode.value && this.pattern.value && this.subjectName.value && this.date || this.time) {
      this.dataSource = [...this.dataSource, {subjectCode: this.subjectCode.value, subjectName: this.subjectName.value, pattern: this.pattern.value, date: new Date(this.date.value).toLocaleDateString(), time: this.time.value}]
      this.subjectCode.reset()
      this.subjectName.reset()
      this.pattern.reset()
      this.date.setValue(new Date())
      this.time.setValue(`${new Date().getHours().toString()}:${new Date().getMinutes().toString()}`)
    }
  }

  saveData() {
    const department = this.departmentControl.value
    const faculty = this.facultyControl.value
    const program = this.programControl.value
    const year = this.yearControl.value
    const division = this.divisionControl.value
    const school = this.schoolControl.value
    const semester = this.semesterControl.value
    const subject = this.subjectControl.value

    if(!semester || !subject || !department || !faculty || !program || !year || !division || !school || this.dataSource.length === 0) {
      alert("Please fill all fields");
      return;
    }
    const payload = {
      department,
      faculty,
      program,
      year,
      division,
      school,
      semester,
      subject,
      eseSchedules: this.dataSource
    }
    console.log(payload);
    
    this.eseSchedule.addEseSchedule(payload).subscribe(data => {
      alert(data.message)
      
      if(data.success) {
        this.router.navigate(['/ese-list'])
      }
    })
  }

  constructor(private eseSchedule: EseSchedulerService, private router: Router) { }


  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(!token) this.router.navigate(['/'])
  }

}
