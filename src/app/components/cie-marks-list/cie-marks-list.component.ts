import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { department, divs, faculty, programs, schools, semesters, subjects, year } from 'src/app/data';
import { CieEntryService } from 'src/app/services/cie-entry.service';
@Component({
  selector: 'app-cie-marks-list',
  templateUrl: './cie-marks-list.component.html',
  styleUrls: ['./cie-marks-list.component.css']
})
export class CieMarksListComponent implements OnInit {

  cieEntries:any = null;
  showEditModal:any = false;
  departments = department;
  years = year;
  programs = programs;
  divisions = divs;
  faculties = faculty;
  schools = schools;
  semesters = semesters;
  subjects = subjects;
  currentId = null;
  departmentControl=new FormControl();
  facultyControl=new FormControl();
  programControl=new FormControl();
  yearControl=new FormControl();
  divisionControl=new FormControl();
  schoolControl = new FormControl();
  semesterControl = new FormControl();
  subjectControl = new FormControl();

  dataSource:any=[]
  displayedColumns: string[] = ['PRN', 'SRN', 'Total CIE', 'Student Name', 'CIE 1', 'CIE 2', 'CIE 3'];
  constructor(private cieService: CieEntryService) { }

  ngOnInit(): void {
    this.cieService.getCieEntry().subscribe((data:any) => {
      this.cieEntries = data.cieMarks;
    })
  }
  add() {
    this.dataSource = [...this.dataSource, {
      prn: '', srn: '', totalCie: 0, studentName: '', cie1: 0, cie2: 0, cie3: 0
    }]
  }
  convertToNumber(a:any, b:any, c:any) {
    return parseInt(a) + parseInt(b) + parseInt(c)
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
    this.dataSource = this.dataSource.map((data:any) =>{
      data.totalCie = this.convertToNumber(data.cie1,data.cie2,data.cie3)
      return data;
    })
    if(!semester || !subject || !department || !faculty || !program || !year || !division || !school) {
      alert("Please fill all fields");
      return;
    }
    if(this.dataSource.some((data:any) => (!data.prn || !data.srn || !data.studentName || !data.totalCie || !data.cie1 || !data.cie2 || !data.cie2))) {
      alert("Please fill CIE marks")
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
      cieMarks: this.dataSource
    }
    this.cieService.updateCieEntry(payload, this.currentId).subscribe((data:any) => {
      alert(data.message)
      if(data.success) {
        window.location.reload()
      }
    }) 
  }
  onEditClick(item:any) {
    this.departmentControl.setValue(item.department)
    this.facultyControl.setValue(item.faculty)
    this.programControl.setValue(item.program)
    this.yearControl.setValue(item.classIn)
    this.divisionControl.setValue(item.division)
    this.schoolControl.setValue(item.school)
    this.semesterControl.setValue(item.semester)
    this.subjectControl.setValue(item.subject)
    this.currentId = item._id;
    this.dataSource = item.cieMarks;
    this.showEditModal = true
  }
  deleteCie(id:any) {
    this.cieService.deleteCieEntry(id).subscribe(_ => {
      window.location.reload()
    });
  }
  closeModal() {
    this.currentId = null;
    this.showEditModal = null;
  }
}
