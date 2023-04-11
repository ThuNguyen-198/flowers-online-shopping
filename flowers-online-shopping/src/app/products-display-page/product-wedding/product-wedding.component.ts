import { Component, OnInit } from '@angular/core';
import { FlowersService } from 'src/app/services/flowers.service';
import { Flower } from 'src/app/data-models/flower.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-wedding',
  templateUrl: './product-wedding.component.html',
  styleUrls: ['./product-wedding.component.css'],
})
export class ProductWeddingComponent implements OnInit {
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
}
