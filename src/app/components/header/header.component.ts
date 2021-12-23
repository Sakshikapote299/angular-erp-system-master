import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/Emitters';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }
  isLoggedIn:any = false;
  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        console.log({ auth });
        
        if(!auth) this.router.navigate(['/'])

        this.isLoggedIn = auth;
      }
    );
  }
  logout() {
    localStorage.removeItem('token');
    Emitters.authEmitter.emit(false);
  }

}
