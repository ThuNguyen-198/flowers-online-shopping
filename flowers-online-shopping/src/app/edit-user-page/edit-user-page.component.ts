import { Component, OnInit } from '@angular/core';
import { CustomerData } from '../data-models/customer.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.css']
})
export class EditUserPageComponent implements OnInit {
  
  customer: CustomerData = { user: '', email: '', pwd: '',
    phone: '', firstName: '', lastName: '', address: '' };
    
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get customer data from route parameters
    this.route.params.subscribe(params => {
      this.customer = JSON.parse(params['customerData']);
    });
  }

  onSubmit(form: NgForm) {
    console.log(this.customer);
    this.router.navigate(['account']);
  }
}
