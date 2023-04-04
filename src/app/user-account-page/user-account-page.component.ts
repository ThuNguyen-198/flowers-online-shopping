import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-account-page',
  templateUrl: './user-account-page.component.html',
  styleUrls: ['./user-account-page.component.css']
})
export class UserAccountPageComponent {
  user: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser()
      .subscribe(user => this.user = user);
  }
}
