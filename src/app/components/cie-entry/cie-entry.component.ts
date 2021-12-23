import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { department, divs, faculty, programs, schools, semesters, subjects, year } from 'src/app/data';
import { CieEntryService } from 'src/app/services/cie-entry.service';

@Component({
  selector: 'app-cie-entry',
  templateUrl: './cie-entry.component.html',
  styleUrls: ['./cie-entry.component.css']
})
export class CieEntryComponent implements OnInit {
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

  dataSource:any=[]
  displayedColumns: string[] = ['PRN', 'SRN', 'Total CIE', 'Student Name', 'CIE 1', 'CIE 2', 'CIE 3'];
  constructor(private cieService: CieEntryService, private router:Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(!token) this.router.navigate(['/'])
  }


  add() {
    this.dataSource = [...this.dataSource, {
      prn: '', srn: '', totalCie: 0, studentName: '', cie1: 0, cie2: 0, cie3: 0
    }]
  }
  convertToNumber(a:any, b:any, c:any) {
    return parseInt(a) + parseInt(b) + parseInt(c)
  }
  announceSortChange(e:any) {
    console.log(e);
    
    if(e.direction === 'asc') {
      const temp = [...this.dataSource];
      const sortedArray = temp.sort((a:any, b:any) => {
        const aTotal = this.convertToNumber(a.cie1, a.cie2, a.cie3);
        const bTotal = this.convertToNumber(b.cie1, b.cie2, b.cie3);
        return aTotal - bTotal;
      });
      this.dataSource = sortedArray;
    }
    else if(e.direction === 'desc') {
      const temp = [...this.dataSource];
      const sortedArray = temp.sort((a:any, b:any) => {
        const aTotal = this.convertToNumber(a.cie1, a.cie2, a.cie3);
        const bTotal = this.convertToNumber(b.cie1, b.cie2, b.cie3);
        return bTotal - aTotal;
      });
      this.dataSource = sortedArray;
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
    this.cieService.addCieEntry(payload).subscribe((data:any) => {
      alert(data.message)
      if(data.success) {
        this.router.navigate(['/cie-marks-list'])
        
      }
    })
    
  }
}
