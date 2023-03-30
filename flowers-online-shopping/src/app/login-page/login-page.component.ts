import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  onLogin(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.authService.login(form.value.email, form.value.pwd);
  }
}
