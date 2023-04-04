import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CustomerData } from '../data-models/customer.model';
import { Observable } from 'rxjs';


//maybe
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-account-page',
  templateUrl: './user-account-page.component.html',
  styleUrls: ['./user-account-page.component.css']
})

export class UserAccountPageComponent implements OnInit {
    user: CustomerData = { cuID: 'Ed', user: 'Lname', email: 'jdfj@gmail', pwd: 'dkjf', phone: '972746', firstName: 'ed', lastName: 'spr' };

    //change to one of these either work
    //user: CustomerData = { cuID: '', user: '', email: '', pwd: '', phone: '', firstName: '', lastName: '' };
    //user!: CustomerData;

    constructor(private authService: AuthService) { }

 ngOnInit(): void {
      this.authService.getCurrentUser().subscribe(user => {
        this.user = user;
        console.log(this.user);
      });
  }
}

