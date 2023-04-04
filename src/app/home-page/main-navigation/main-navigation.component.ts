import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css'],
})
export class MainNavigationComponent implements OnInit {
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
