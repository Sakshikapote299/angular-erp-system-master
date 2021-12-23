import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EseSchedulerService {

  constructor(private http: HttpClient) { }
  addEseSchedule(data:any):Observable<any> {
    return this.http.post('http://localhost:8000/api/ese-schedule', { ...data });
  }
  getEseSchedule():Observable<any> {
    return this.http.get('http://localhost:8000/api/ese-schedule');
  }
  updateEseSchedule(data: any, id:any):Observable<any> {
    return this.http.put(`http://localhost:8000/api/ese-schedule/${id}`, {...data});
  }
  deleteEseSchedule(id:any):Observable<any> {
    return this.http.delete(`http://localhost:8000/api/ese-schedule/${id}`);
  }
}
