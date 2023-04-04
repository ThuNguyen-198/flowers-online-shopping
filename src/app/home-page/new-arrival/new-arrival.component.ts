import { Component, OnInit } from '@angular/core';
import { FlowersService } from 'src/app/services/flowers.service';
import { Subscription } from 'rxjs';
import { Flower } from 'src/app/data-models/flower.model';

@Component({
  selector: 'app-new-arrival',
  templateUrl: './new-arrival.component.html',
  styleUrls: ['./new-arrival.component.css'],
})
export class NewArrivalComponent implements OnInit {
  newArrivalFlowers: Flower[] = [];
  private flowerSub: Subscription = new Subscription();

  constructor(public flowerService: FlowersService) {}

  ngOnInit(): void {
    this.flowerService.getFlowersByCategory('ao');
    this.flowerSub = this.flowerService
      .getFlowerUpdateListener()
      .subscribe((flowerData: Flower[]) => {
        this.newArrivalFlowers = flowerData;
      });
  }
}
