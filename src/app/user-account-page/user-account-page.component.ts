import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD:src/app/user-account-page/user-account-page.component.ts
import { UserService } from '../services/user.service';
=======
import { AuthService } from '../services/auth.service';
import { CustomerData } from '../data-models/customer.model';
import { Observable } from 'rxjs';


//maybe
import { FormGroup, FormControl } from '@angular/forms';
>>>>>>> 71c1f30173d3827b4e6f912d24b4d23bc7cddb14:flowers-online-shopping/src/app/user-account-page/user-account-page.component.ts

@Component({
  selector: 'app-user-account-page',
  templateUrl: './user-account-page.component.html',
  styleUrls: ['./user-account-page.component.css']
})
<<<<<<< HEAD:src/app/user-account-page/user-account-page.component.ts
export class UserAccountPageComponent {
  user: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser()
      .subscribe(user => this.user = user);
=======

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
>>>>>>> 71c1f30173d3827b4e6f912d24b4d23bc7cddb14:flowers-online-shopping/src/app/user-account-page/user-account-page.component.ts
  }
}

