import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CustomerData } from '../data-models/customer.model';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.authService.createCustomer(
      form.value.user,
      form.value.email,
      form.value.pwd,
      form.value.phone,
      form.value.first,
      form.value.last,
      form.value.address
    );
  }
}
