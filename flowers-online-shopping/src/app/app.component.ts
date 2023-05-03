import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FlowersService } from './services/flowers.service';
import { Flower } from './data-models/flower.model';
import { HttpClient } from '@angular/common/http';

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
    public flowerService: FlowersService,
    private http: HttpClient
  ) {
    //window.addEventListener('beforeunload', this.onDeleteGuestCart);
  }

  ngOnInit(): void {
    this.authService.autoAuthUser();
  }
}
