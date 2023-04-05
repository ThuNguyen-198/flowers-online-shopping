import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CustomerData } from '../data-models/customer.model';
import { Router } from '@angular/router';


@Component({
  selector: 'order-history-page',
  templateUrl: './order-history-page.component.html',
  styleUrls: ['./order-history-page.component.css'],
})
export class OrderHistoryPageComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.router.navigate(['account']);
  }

}
