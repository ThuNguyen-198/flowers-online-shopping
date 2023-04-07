import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Flower } from 'src/app/data-models/flower.model';
import { FlowersService } from 'src/app/services/flowers.service';

@Component({
  selector: 'app-product-individuals',
  templateUrl: './product-individuals.component.html',
  styleUrls: ['./product-individuals.component.css'],
})
export class ProductIndividualsComponent implements OnInit {
  searchKey = '';
  testimFlower: Flower[] = [];
  categories = ['All', 'Rose', 'Daisy', 'Sun Flower', 'Tulip', 'Lily', 'Leaf'];
  selectedCategory = 'All';
  showSearchBox = false;

  private flowerSub: Subscription = new Subscription();

  constructor(public flowerService: FlowersService) {}

  ngOnInit(): void {
    this.flowerService.getFlowersByCategory('c');
    this.flowerSub = this.flowerService
      .getFlowerUpdateListener()
      .subscribe((flowerData: Flower[]) => {
        this.testimFlower = flowerData;
      });
  }
}
