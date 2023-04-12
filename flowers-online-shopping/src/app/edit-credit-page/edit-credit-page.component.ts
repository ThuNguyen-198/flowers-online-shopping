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
    // Get customer data
    const storedCreditCard = localStorage.getItem('creditCard');
    if (storedCreditCard) {
      this.creditCard = JSON.parse(storedCreditCard);
    }
  }

  onSubmit(form: NgForm) {
    console.log(this.creditCard);
    // Store credit card data in local storage
    localStorage.setItem('creditCard', JSON.stringify(this.creditCard));
    this.router.navigate(['account']);
  }
}
