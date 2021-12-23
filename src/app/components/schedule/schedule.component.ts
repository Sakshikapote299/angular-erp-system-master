import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { department, divs, faculty, programs, students, year } from 'src/app/data';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  // options
  departments = department;
  years = year;
  programs = programs;
  divisions = divs;
  faculties = faculty;
  students = students;

  // formCOntrls
  departmentControl=new FormControl();
  facultyControl=new FormControl();
  programControl=new FormControl();
  yearControl=new FormControl();
  divisionControl=new FormControl();
  dateControl=new FormControl(new Date());
  timeControl=new FormControl(`${new Date().getHours().toString()}:${new Date().getMinutes().toString()}`);
  agendaControl=new FormControl();
  venueControl=new FormControl();
  form:any;
  isAllStudentsChecked:any = false;
  constructor(private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token')
    if(!token) this.router.navigate(['/'])
  }

  async saveForm(){
    const department = this.departmentControl.value
    const faculty = this.facultyControl.value
    const program = this.programControl.value
    const year = this.yearControl.value
    const division = this.divisionControl.value
    const time = this.timeControl.value
    const date = this.dateControl.value
    const agenda = this.agendaControl.value
    const venue = this.venueControl.value
    const students = this.isAllStudentsChecked ? this.students.map((student:any) => student.name) : this.form.value.checkArray

    
    const data = await fetch('http://localhost:8000/api/schedule', {
      method: 'POST',
      body: JSON.stringify({
        department, faculty, program, year, division, date, time, agenda, venue, students
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const response = await data.json();
    alert(response.message);
    if(response.status === 'ERROR') return;
    this.router.navigate(['/meetings'])
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
  onSelectAll(e:any) {
    if(e.target.checked) {
      this.isAllStudentsChecked = true
    }
    else {
      this.isAllStudentsChecked = false
    }
  }

}
