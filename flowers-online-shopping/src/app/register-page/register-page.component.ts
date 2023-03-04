import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  form: FormControl = new FormControl([]);
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onSignup(form: NgForm){
    if(form.invalid){
      return;
    }

    this.authService.createEmployee(this.form.value.loginID, this.form.value.password, this.form.value.permission);
  }

}
