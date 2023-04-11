import { Component, OnInit } from '@angular/core';
import { CustomerData } from '../data-models/customer.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.css'],
})
export class EditUserPageComponent implements OnInit {
  customer: CustomerData = {
    user: 'Jum',
    email: '',
    pwd: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    isAdmin: false,
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get customer data
    const storedCustomer = localStorage.getItem('customer');
    if (storedCustomer) {
      this.customer = JSON.parse(storedCustomer);
    }
  }

  onSubmit(form: NgForm) {
    console.log(this.customer);
    localStorage.setItem('customer', JSON.stringify(this.customer));
    this.router.navigate(['account']);
  }
}
