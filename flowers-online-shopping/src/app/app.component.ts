import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FlowersService } from './services/flowers.service';
import { Flower } from './data-models/flower.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'flowers-online-shopping';
  userEmail = localStorage.getItem('userEmail');
  constructor(
    private authService: AuthService,
    public flowerService: FlowersService
  ) {
    //window.addEventListener('beforeunload', this.onDeleteGuestCart);
  }

  ngOnInit(): void {
    this.authService.autoAuthUser();
  }

  @HostListener('window:onbeforeunload', ['$event'])
  clearLocalStorage(event: any) {
    localStorage.clear();
  }

  @HostListener('window:onbeforeunload', ['$event'])
  onDeleteGuestCart(event: BeforeUnloadEvent) {
    if (this.userEmail === 'guest@gmail.com') {
      this.flowerService.deleteCart(this.userEmail).subscribe(() => {
        console.log('Deleted cart');
      });
    }
  }
}
