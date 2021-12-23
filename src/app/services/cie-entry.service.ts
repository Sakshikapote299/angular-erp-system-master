import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CieEntryService {

  constructor(private http: HttpClient) { }

  addCieEntry(data:any) {
    return this.http.post('http://localhost:8000/api/cie-marks', { ...data });
  }
  getCieEntry() {
    return this.http.get('http://localhost:8000/api/cie-marks');
  }
  updateCieEntry(data:any, id:any) {
    return this.http.put(`http://localhost:8000/api/cie-marks/${id}`, { ...data });
  }
  deleteCieEntry( id:any) {
    return this.http.delete(`http://localhost:8000/api/cie-marks/${id}`);
  }
}
