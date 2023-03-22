import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-arrival',
  templateUrl: './new-arrival.component.html',
  styleUrls: ['./new-arrival.component.css'],
})
export class NewArrivalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

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
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      image: '../../../assets/testimonials/flowers-4.jpeg',
      title: 'Item 3',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      image: '../../../assets/testimonials/flowers-5.jpeg',
      title: 'Item 3',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      image: '../../../assets/testimonials/flowers-6.jpeg',
      title: 'Item 3',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      image: '../../../assets/testimonials/flowers-7.jpeg',
      title: 'Item 3',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ];
}
