import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public formError: string = '';
  submitted = false;

  credentials = {
    name: '',
    email: '',
    password: ''
  }

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  public onLoginSubmit(): void {
    this.formError = ''
    
    if(!this.credentials.email || !this.credentials.password || !this.credentials.name) {
      this.formError = 'All fields are required, please try again'
      this.router.navigateByUrl('#')
    }
    else {
      this.doLogin()
    }
  }

  public doLogin(): void {
    let newUser = {
      name: this.credentials.name,
      email: this.credentials.email
    } as User

    this.authenticationService.login(newUser, this.credentials.password)

    if(this.authenticationService.isLoggedIn()) {
      this.router.navigate([''])
    }
    else {
      var timer = setTimeout(() => {
        if(this.authenticationService.isLoggedIn()) {
          this.router.navigate([''])
        }
      }, 3000)
    }
  }
}
