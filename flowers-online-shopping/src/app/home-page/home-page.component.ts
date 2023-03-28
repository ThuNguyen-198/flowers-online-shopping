import { Component, OnInit } from '@angular/core';
import { FlowersService } from '../services/flowers.service';
import { Subscription } from 'rxjs';
import { Flower } from '../data-models/flower.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor() {}
  searchKey = '';
  getSearchKey() {}
  ngOnInit(): void {}
}
