import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
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
  flowers = [
    {
      src: '../../../assets/testimonials/flowers-1.jpeg',
      alt: 'testimonial flower',
    },
    {
      src: '../../../assets/testimonials/flowers-2.jpeg',
      alt: 'testimonial flower',
    },
    {
      src: '../../../assets/testimonials/flowers-3.jpeg',
      alt: 'testimonial flower',
    },
    {
      src: '../../../assets/testimonials/flowers-4.jpeg',
      alt: 'testimonial flower',
    },
    {
      src: '../../../assets/testimonials/flowers-5.jpeg',
      alt: 'testimonial flower',
    },
    {
      src: '../../../assets/testimonials/flowers-6.jpeg',
      alt: 'testimonial flower',
    },
    {
      src: '../../../assets/testimonials/flowers-7.jpeg',
      alt: 'testimonial flower',
    },
    {
      src: '../../../assets/testimonials/flowers-8.jpeg',
      alt: 'testimonial flower',
    },
    {
      src: '../../../assets/testimonials/flowers-9.jpeg',
      alt: 'testimonial flower',
    },
    {
      src: '../../../assets/testimonials/flowers-10.jpeg',
      alt: 'testimonial flower',
    },
    {
      src: '../../../assets/testimonials/flowers-11.jpeg',
      alt: 'testimonial flower',
    },
    {
      src: '../../../assets/testimonials/flowers-12.jpeg',
      alt: 'testimonial flower',
    },
  ];
}
