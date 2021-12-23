import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { department, divs, faculty, programs, students, year } from 'src/app/data';


@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {
  meetings = null;
  currentEditItem : any = null;
  showEditModal = false;


  departments = department;
  years = year;
  programs = programs;
  divisions = divs;
  faculties = faculty;
  students = students
  

  // formControls
  departmentControl=new FormControl();
  facultyControl=new FormControl();
  programControl=new FormControl();
  yearControl=new FormControl();
  divisionControl=new FormControl();
  dateControl=new FormControl();
  timeControl=new FormControl();
  agendaControl=new FormControl();
  venueControl=new FormControl();


  async getMeetings() {
    const res = await fetch('http://localhost:8000/api/schedule');
    const data = await res.json();
    data.meetings = data.meetings.map((meeting:any) => {
      const date = new Date(meeting.date).toLocaleDateString();
      meeting.date = date;
      return meeting;
    })
    this.meetings = data.meetings
  }
  
  form:any;
  isAllStudentsChecked:any = false;
  constructor(private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
  }
  ngOnInit(): void {
    this.getMeetings();
  }



  onEditClick(item:any) {
    this.currentEditItem = item;
    const { date, _id, __v, ...rest} = item
    const newDate = new Date(date);
    this.departmentControl.setValue(item.department)
    this.facultyControl.setValue(item.faculty)
    this.programControl.setValue(item.program)
    this.yearControl.setValue(item.classIn)
    this.divisionControl.setValue(item.division)
    this.dateControl.setValue(newDate)
    this.timeControl.setValue(item.time)
    this.agendaControl.setValue(item.agenda)
    this.venueControl.setValue(item.venue);
    this.students = this.students.map((student:any) => {
      if(item.students.includes(student.name)) {
        student.checked = true
        const checkArray: FormArray = this.form.get('checkArray') as FormArray;
        checkArray.push(new FormControl(student.name));

      }else {
        student.checked = false
      }
      return student
    })
    this.showEditModal = true;
  }
  closeEditModal() {
    this.showEditModal = false
    this.currentEditItem = null;
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
    const res = await fetch(`http://localhost:8000/api/schedule/${this.currentEditItem?._id}`, {
      method: 'put',
      body: JSON.stringify({
        department, faculty, program, year, division, date, time, agenda, venue, students
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    console.log({ data });
    window.location.reload();
  }
  async deleteMeeting(id:any) {
    try {
      await fetch(`http://localhost:8000/api/schedule/${id}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    location.reload();
    }catch(err:any) {
      console.log(err.message);
      
    }
    
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
