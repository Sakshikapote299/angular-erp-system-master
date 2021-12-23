import { Component, OnInit } from '@angular/core';
import { SyllabusService } from 'src/app/syllabus.service';
import { department, divs, faculty, programs, schools, year } from 'src/app/data';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-syllabus-list',
  templateUrl: './syllabus-list.component.html',
  styleUrls: ['./syllabus-list.component.css']
})
export class SyllabusListComponent implements OnInit {

  constructor(private syllabusService: SyllabusService) { }
  syllabuses:any = null;
  dataSource:any = [];
  displayedColumns: string[] = ['Unit', 'Details','Delete Row'];
  showEditModal:any= false;
  ngOnInit(): void {
    this.syllabusService.getSyllabus().subscribe(data => {
      console.log({ data });
      this.syllabuses = data.syllabus;
      
    })
  }
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
  currentId = null;
  onEditClick(item:any) {
    this.departmentControl.setValue(item.department)
    this.facultyControl.setValue(item.faculty)
    this.programControl.setValue(item.program)
    this.yearControl.setValue(item.classIn)
    this.divisionControl.setValue(item.division)
    this.content.setValue(item.content)
    this.schoolControl.setValue(item.school)
    this.dataSource = [...item.unitDetails]
    this.currentId = item._id;
    this.showEditModal = true;
    
  }
  closeModal() {
    this.currentId = null;
    this.showEditModal = false
  }
  deleteSyllabus(id:any) {
    this.syllabusService.deleteSyllabus(id).subscribe(data => {
      window.location.reload();
    })
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
    this.syllabusService.updateSyllabus(payload, this.currentId).subscribe(data => {
      this.showEditModal = false;
      this.currentId = null;
      window.location.reload();
    })
    
  }
  add() {
    if(this.unit.value && this.unitDetails.value) {
      this.dataSource = [...this.dataSource, {unit: this.unit.value, details: this.unitDetails.value}]
      this.unit.reset()
      this.unitDetails.reset()
    }
  }

}
