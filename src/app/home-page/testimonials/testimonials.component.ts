import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Flower } from 'src/app/data-models/flower.model';
import { FlowersService } from 'src/app/services/flowers.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent implements OnInit {
  testimFlower: Flower[] = [];
  private flowerSub: Subscription = new Subscription();

  constructor(public flowerService: FlowersService) {}

  ngOnInit(): void {
    this.flowerService.getFlowersByCategory('ao');
    this.flowerSub = this.flowerService
      .getFlowerUpdateListener()
      .subscribe((flowerData: Flower[]) => {
        this.testimFlower = flowerData;
      });
  }
  customers = [
    {
      img: '../../../assets/testimonials/customer-1.webp',
      review:
        'This floral arrangement far exceeded my expectations, and made my friend smile with excitement during her time of grief. Great job!!! Thank you so much!',
      name: 'Dyson',
    },
    {
      img: '../../../assets/testimonials/customer-2.webp',
      review:
        'This floral arrangement far exceeded my expectations, and made my friend smile with excitement during her time of grief. Great job!!! Thank you so much!',
      name: 'Julia',
    },
    {
      img: '../../../assets/testimonials/customer-3.jpeg',
      review:
        'This floral arrangement far exceeded my expectations, and made my friend smile with excitement during her time of grief. Great job!!! Thank you so much!',
      name: 'Rebecca',
    },
    {
      img: '../../../assets/testimonials/customer-4.jpeg',
      review:
        'This floral arrangement far exceeded my expectations, and made my friend smile with excitement during her time of grief. Great job!!! Thank you so much!',
      name: 'Sam',
    },
  ];
}
