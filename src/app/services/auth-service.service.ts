import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  login(creds:any):Observable<any> {
    return this.http.post('http://localhost:8000/api/users/login', {
      ...creds
    })
  }
  signUp(creds: any):Observable<any> {
    return this.http.post('http://localhost:8000/api/users/signup', {
      ...creds
    })
  }

  isLoggedInUser():Observable<any> {
    return of(!!localStorage.getItem('token'))
  }
}
