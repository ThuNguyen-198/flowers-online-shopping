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
      img: '../../../assets/testimonials/customer-4.jpeg',
      review:
        'Great online flower shop - easy to use website, beautiful bouquets, and timely delivery. Highly recommended.',
      name: 'Sam',
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
        'I had an excellent experience with this flower shop. Their website was easy to navigate, and they had a wide variety of bouquets to choose from. The flowers arrived on time and were even more beautiful in person.',
      name: 'Rebecca',
    },
    {
      img: '../../../assets/testimonials/customer-1.webp',
      review:
        'This online flower shop is fantastic! The website is easy to navigate, the selection of flowers is impressive, and the delivery was prompt and efficient. Overall, I highly recommend this online flower shop for all of your floral needs.',
      name: 'Dyson',
    },
  ];

  flowers = [
    {
      img: '../../../assets/testimonials/flowers-1.jpeg',
      alt: 'flower image 1',
    },
    {
      img: '../../../assets/testimonials/flowers-2.jpeg',
      alt: 'flower image 2',
    },
    {
      img: '../../../assets/testimonials/flowers-3.jpeg',
      alt: 'flower image 3',
    },
    {
      img: '../../../assets/testimonials/flowers-4.jpeg',
      alt: 'flower image 4',
    },
    {
      img: '../../../assets/testimonials/flowers-5.jpeg',
      alt: 'flower image 5',
    },
    {
      img: '../../../assets/testimonials/flowers-6.jpeg',
      alt: 'flower image 6',
    },
    {
      img: '../../../assets/testimonials/flowers-7.jpeg',
      alt: 'flower image 7',
    },
    {
      img: '../../../assets/testimonials/flowers-8.jpeg',
      alt: 'flower image 8',
    },
    {
      img: '../../../assets/testimonials/flowers-9.jpeg',
      alt: 'flower image 9',
    },
    {
      img: '../../../assets/testimonials/flowers-10.jpeg',
      alt: 'flower image 10',
    },
    {
      img: '../../../assets/testimonials/flowers-11.jpeg',
      alt: 'flower image 11',
    },
    {
      img: '../../../assets/testimonials/flowers-12.jpeg',
      alt: 'flower image 12',
    },
  ];
}
