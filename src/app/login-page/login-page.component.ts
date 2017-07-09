import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }
  login() {
    this.authService.login().then((data) => {
      // Send them to the homepage if they are logged in
      this.router.navigate(['']);
    })
  }

}
