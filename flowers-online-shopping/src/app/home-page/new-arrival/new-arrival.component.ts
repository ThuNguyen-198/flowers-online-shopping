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

  /*
  items = [
    {
      image: '../../../assets/testimonials/flowers-1.jpeg',
      title: 'Item 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      image: '../../../assets/testimonials/flowers-2.jpeg',
      title: 'Item 2',
      description:
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      image: '../../../assets/testimonials/flowers-3.jpeg',
      title: 'Item 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      image: '../../../assets/testimonials/flowers-4.jpeg',
      title: 'Item 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      image: '../../../assets/testimonials/flowers-5.jpeg',
      title: 'Item 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      image: '../../../assets/testimonials/flowers-6.jpeg',
      title: 'Item 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      image: '../../../assets/testimonials/flowers-7.jpeg',
      title: 'Item 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ];*/
}
