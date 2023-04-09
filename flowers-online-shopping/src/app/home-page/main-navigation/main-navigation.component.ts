import { Component, HostListener, OnInit } from '@angular/core';
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
  initial = 'UN';
  displayDropDown = false;
  ngOnInit(): void {
    // let initial = 'user name';
    // let words = initial.split('');
    // for (let i = 0; i < words.length; i++) {
    //   words[i] = words[i].substring(1);
    // }
    // initial = words.join();
    // console.log(initial);

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
  onDisplayDropDown() {
    this.displayDropDown = !this.displayDropDown;
    console.log(this.displayDropDown);
  }

  // Change displayDropDown status when clicking on the screen or account-button
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const accountBtn = document.querySelector('#account-button') as HTMLElement;

    const dropDownMenu = document.querySelector(
      '.drop-down-menu'
    ) as HTMLElement;

    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (
        target !== accountBtn &&
        target.closest('.drop-down-menu') !== dropDownMenu
      ) {
        dropDownMenu.style.display = 'none';
      }
    });
  }
}
