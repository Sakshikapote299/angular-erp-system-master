import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { department, divs, faculty, programs, year, schools, students } from 'src/app/data';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  form: any;

  notifications = null;
  currentEditItem : any = null;
  showEditModal = false;

  departments = department;
  years = year;
  programs = programs;
  divisions = divs;
  faculties = faculty;
  schools = schools;
  students = students

   // formControls
  departmentControl=new FormControl();
  facultyControl=new FormControl();
  programControl=new FormControl();
  yearControl=new FormControl();
  school=new FormControl();
  divisionControl=new FormControl();
  dateControl=new FormControl();
  timeControl=new FormControl();
  subject = new FormControl();
  details = new FormControl();
  studentsControl = new FormControl();

  isAllStudentsChecked:any = false;


  async getNotifications() {
    const res = await fetch('http://localhost:8000/api/notifications');
    const data = await res.json();
    data.notifications = data.notifications.map((notification:any) => {
      const date = new Date(notification.date).toLocaleDateString();
      notification.date = date;
      return notification;
    })
    this.notifications = data.notifications
  }
  constructor(private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
  }

  ngOnInit(): void {
    this.getNotifications()
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
    this.subject.setValue(item.subject)
    this.details.setValue(item.details);
    this.studentsControl.setValue(item.students)
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
  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if (e.target.checked) {
      console.log({ in: "in" });
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
  closeEditModal() {
    this.showEditModal = false
    this.currentEditItem = null;
  }
  async deleteMeeting(id:any) {
    try {
      await fetch(`http://localhost:8000/api/notifications/${id}`, {
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
  async saveForm(){
    const department = this.departmentControl.value
    const faculty = this.facultyControl.value
    const program = this.programControl.value
    const year = this.yearControl.value
    const division = this.divisionControl.value
    const time = this.timeControl.value
    const date = this.dateControl.value
    const subject = this.subject.value
    const details = this.details.value;
    const students = this.isAllStudentsChecked ? this.students.map((student:any) => student.name) : this.form.value.checkArray
    
    const res = await fetch(`http://localhost:8000/api/notifications/${this.currentEditItem?._id}`, {
      method: 'put',
      body: JSON.stringify({
        department, faculty, program, year, division, date, time, subject, details, students
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    console.log({ data });
    window.location.reload();
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
