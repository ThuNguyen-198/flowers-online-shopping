import { Component, OnInit } from '@angular/core';
import { FlowersService } from '../services/flowers.service';
import { Flower } from '../data-models/flower.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-display-page',
  templateUrl: './products-display-page.component.html',
  styleUrls: ['./products-display-page.component.css'],
})
export class ProductsDisplayPageComponent implements OnInit {
  flowers: Flower[] = [];
  currentPage = 1;

  private flowerSub: Subscription = new Subscription();

  constructor(public flowerService: FlowersService) {}

  ngOnInit(): void {
    this.flowerService.getFlowersByCategory('all');
    this.flowerSub = this.flowerService
      .getFlowerUpdateListener()
      .subscribe((flowerData: Flower[]) => {
        this.flowers = flowerData;
      });
  }

  onAddToCart(product: Flower) {
    let userEmail: any;
    if (localStorage.getItem('userEmail') != null) {
      userEmail = localStorage.getItem('userEmail')?.toString();
    } else {
      userEmail = 'guest@gmail.com';
    }
    this.flowerService.addToCart(product, userEmail);
  }
}
