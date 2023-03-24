import { Component, OnInit } from '@angular/core';
import { FlowersService } from 'src/app/services/flowers.service';
import { Flower } from 'src/app/data-models/flower.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-birthday',
  styleUrls: ['./product-birthday.component.css'],
  templateUrl: 'product-birthday.component.html',
})
export class ProductBirthdayComponent implements OnInit {
  flowers: Flower[] = [];
  currentPage = 1;

  private flowerSub: Subscription = new Subscription();

  constructor(public flowerService: FlowersService) {}
  ngOnInit(): void {
    this.flowerService.getFlowersByCategory('bd');
    this.flowerSub = this.flowerService
      .getFlowerUpdateListener()
      .subscribe((flowerData: Flower[]) => {
        this.flowers = flowerData;
      });
  }
}
