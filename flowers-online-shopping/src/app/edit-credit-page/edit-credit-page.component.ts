import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreditCard } from '../data-models/customer.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-credit-page',
  templateUrl: './edit-credit-page.component.html',
  styleUrls: ['./edit-credit-page.component.css'],
})

export class EditCreditPageComponent implements OnInit {
  creditCard: CreditCard = {
    cardNumber: 'This will not be displayed',
    cardholderName: 'Fake Test Name',
    expirationMonth: 3,
    expirationYear: 1992,
    cvv: '010',
  };
  
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get customer data from route parameters
    this.route.queryParams.subscribe(params => {
      this.creditCard = JSON.parse(params['creditCard']);
    });
  }

  onSubmit(form: NgForm) {
    console.log(this.creditCard);
    this.router.navigate(['account']);
  }
}
