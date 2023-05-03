import { Component, OnInit } from '@angular/core';
import { FlowersService } from '../services/flowers.service';
import { Flower } from '../data-models/flower.model';
import { Subscription } from 'rxjs';
import { Individual } from '../data-models/individual.model';

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

  onAddIndividualsToCart(individual: Individual) {}
}
