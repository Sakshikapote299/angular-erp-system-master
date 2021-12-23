import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router'; 
import { department, divs, faculty, programs, year, schools, students } from 'src/app/data';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  departments = department;
  years = year;
  programs = programs;
  divisions = divs;
  faculties = faculty;
  schools = schools;
  students = students;

  isAllStudentsChecked = false
  form: any;

   // formControls
  departmentControl=new FormControl();
  facultyControl=new FormControl();
  programControl=new FormControl();
  yearControl=new FormControl();
  school=new FormControl();
  divisionControl=new FormControl();
  dateControl=new FormControl(new Date());
  timeControl=new FormControl(new Date().getHours().toString() + ":" + new Date().getMinutes().toString());
  subject = new FormControl();
  details = new FormControl();
  studentsControl = new FormControl();


  constructor(private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
  }
  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(!token) this.router.navigate(['/'])
  }
  async saveNotification() {
    const department = this.departmentControl.value
    const faculty = this.facultyControl.value
    const program = this.programControl.value
    const year = this.yearControl.value
    const division = this.divisionControl.value
    const time = this.timeControl.value
    const date = this.dateControl.value
    const subject = this.subject.value
    const details = this.details.value
    const students = this.isAllStudentsChecked ? this.students.map((student:any) => student.name) : this.form.value.checkArray
    const data = await fetch('http://localhost:8000/api/notifications', {
      method: 'POST',
      body: JSON.stringify({
        department, faculty, program, year, division, date, time, subject, details, students
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const response = await data.json();
    alert(response.message);
    if(response.status === 'ERROR') return;
    this.router.navigate(['/notifications-list'])
  }

  onSelectAll(e:any) {
    if(e.target.checked) {
      this.isAllStudentsChecked = true
    }
    else {
      this.isAllStudentsChecked = false
    }
  }
}
