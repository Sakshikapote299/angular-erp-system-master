import { Component, OnInit } from '@angular/core';
import { EseSchedulerService } from 'src/app/services/ese-scheduler.service';
import { FormControl } from '@angular/forms';
import { department, divs, faculty, programs, schools, semesters, subjects, year } from 'src/app/data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ese-list',
  templateUrl: './ese-list.component.html',
  styleUrls: ['./ese-list.component.css']
})
export class EseListComponent implements OnInit {
  eseSchedules = null;
  dataSource:any=[]
  displayedColumns: string[] = ['Pattern', 'Subject Code', 'Subject Name', 'Date', 'Time'];



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
  subjectCode = new FormControl();
  pattern = new FormControl();
  subjectName = new FormControl();
  date=new FormControl(new Date().getHours().toString() + ":" + new Date().getMinutes().toString());
  time=new FormControl();

  showEditModal:any = false

  currentId = null;
  constructor(private ese: EseSchedulerService, private router: Router) { }

  ngOnInit(): void {
    this.ese.getEseSchedule().subscribe(data => {
      this.eseSchedules = data.eseSchedules
    })
  }

  onEditClick(item:any) {
    console.log(item);
    
    this.departmentControl.setValue(item.department)
    this.facultyControl.setValue(item.faculty)
    this.programControl.setValue(item.program)
    this.yearControl.setValue(item.classIn)
    this.divisionControl.setValue(item.division)
    this.schoolControl.setValue(item.school)
    this.semesterControl.setValue(item.semester)
    this.subjectControl.setValue(item.subject)
    this.dataSource = [...item.eseSchedules]
    this.currentId = item._id;
    this.showEditModal = true;
  }
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
  deleteEse(id:any){
    this.ese.deleteEseSchedule(id).subscribe(data => {
      alert(data.message)
      window.location.reload();
    })
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
    
    this.ese.updateEseSchedule(payload, this.currentId).subscribe(data => {
      alert(data.message)
      window.location.reload();
    })
  }
  closeModal() {
    this.currentId = null;
    this.showEditModal = null;
  }
}
