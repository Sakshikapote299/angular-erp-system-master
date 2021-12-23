import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SyllabusService {

  constructor(private http: HttpClient) {  }
  addSyllabus(data:any): Observable<any> {
    return this.http.post('http://localhost:8000/api/syllabus', {...data});
  }
  getSyllabus(): Observable<any> {
    return this.http.get('http://localhost:8000/api/syllabus');
  }
  updateSyllabus(data:any, id: any): Observable<any> {
    return this.http.put(`http://localhost:8000/api/syllabus/${id}`, { ...data });
  }
  deleteSyllabus(id: any): Observable<any> {
    return this.http.delete(`http://localhost:8000/api/syllabus/${id}`);
  }
}
