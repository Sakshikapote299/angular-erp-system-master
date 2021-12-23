import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/Emitters';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthServiceService, private formBuilder: FormBuilder, private router: Router) { }

  loginForm = this.formBuilder.group({
    email: [''],
    password: ['']
  })
  signUpForm = this.formBuilder.group({
    email: [''],
    password: ['']
  })

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token) this.router.navigate(['/schedule'])
  }
  login() {
    this.authService.login({...this.loginForm.value}).subscribe(data => {
      alert(data.message);
      if(data.success){
        localStorage.setItem('token', data.token) 
        Emitters.authEmitter.emit(true)
        this.router.navigate(['/schedule']);
      }      
    })
  }
  signUp() {
    console.log(this.signUpForm.value);
    this.authService.signUp({...this.signUpForm.value}).subscribe(data => {
      alert(data.message);
      if(data.status){
        localStorage.setItem('token', data.token) 
        Emitters.authEmitter.emit(true)
        this.router.navigate(['/schedule']);
      }
    })
  }
}
