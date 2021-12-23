import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from './Emitters';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'erp-system';
  token = localStorage.getItem('token');
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.post('http://localhost:8000/api/users/get-user',{ token: this.token }).subscribe((data:any) => {
        if(data.success)
          Emitters.authEmitter.emit(true);
        else
          Emitters.authEmitter.emit(false);
        
    })
  }

}
