import { Component, OnInit } from '@angular/core';
import { FlowersService } from '../services/flowers.service';
import { Subscription } from 'rxjs';
import { Flower } from '../data-models/flower.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  public userIsAuthenticated: boolean = false;
  private authListenerSub: Subscription = new Subscription();

  constructor(public authService: AuthService) {}
  searchKey = '';

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  getSearchKey() {}

  onLogout() {
    this.authService.logout();
  }
}
