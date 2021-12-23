import { Component, OnInit } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { department, divs, faculty, programs, schools, year } from 'src/app/data';
import { SyllabusService } from 'src/app/syllabus.service';
@Component({
  selector: 'app-syllabus',
  templateUrl: './syllabus.component.html',
  styleUrls: ['./syllabus.component.css']
})
export class SyllabusComponent implements OnInit {
  departments = department;
  years = year;
  programs = programs;
  divisions = divs;
  faculties = faculty;
  schools = schools
  departmentControl=new FormControl();
  facultyControl=new FormControl();
  programControl=new FormControl();
  yearControl=new FormControl();
  divisionControl=new FormControl();
  schoolControl = new FormControl();
  content = new FormControl();
  unit = new FormControl();
  unitDetails = new FormControl();

  dataSource:any=[]
  displayedColumns: string[] = ['Unit', 'Details'];
  add() {
    if(this.unit.value && this.unitDetails.value) {
      this.dataSource = [...this.dataSource, {unit: this.unit.value, details: this.unitDetails.value}]
      this.unit.reset()
      this.unitDetails.reset()
    }
  }
  
  saveData() {
    const department = this.departmentControl.value
    const faculty = this.facultyControl.value
    const program = this.programControl.value
    const year = this.yearControl.value
    const division = this.divisionControl.value
    const content = this.content.value
    const school = this.schoolControl.value

    if(!department || !faculty || !program || !year || !division || !content || !school || this.dataSource.length === 0) {
      alert("Please fill all fields");
      return;
    }
    const payload = {
      department,
      faculty,
      program,
      year,
      division,
      content,
      school,
      unitDetails: this.dataSource
    }
    this.syllabusService.addSyllabus(payload).subscribe(data => {
      alert(data.message)
      
      if(data.success) {
        this.router.navigate(['/syllabus-list'])
      }
    })
  }

  constructor(private syllabusService: SyllabusService, private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(!token) this.router.navigate(['/'])
  }

}
