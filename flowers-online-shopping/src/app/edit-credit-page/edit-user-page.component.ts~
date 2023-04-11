import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CustomerData } from '../data-models/customer.model';
import { Router } from '@angular/router';


@Component({
  selector: 'edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.css'],
})
export class EditUserPageComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.router.navigate(['account']);
  }
}
