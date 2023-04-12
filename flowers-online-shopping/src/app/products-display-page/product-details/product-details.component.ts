import { Component, OnInit } from '@angular/core';
import { FlowersService } from 'src/app/services/flowers.service';
import { Flower } from 'src/app/data-models/flower.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  detailFlower: Flower = {
    code: '',
    name: '',
    image_small: '',
    description: '',
    price: '',
  };
  currentPage = 1;

  private flowerSub: Subscription = new Subscription();

  constructor(
    public flowerService: FlowersService,
    public route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.flowerService
        .getSingleBouquet(paramMap.get('code'))
        .subscribe((bouquet) => {
          this.detailFlower.code = bouquet.CODE;
          this.detailFlower.name = bouquet.NAME;
          this.detailFlower.description = bouquet.DESCRIPTION;
          this.detailFlower.image_small = bouquet.LARGE;
          this.detailFlower.price = bouquet.PRICE;
        });
    });
  }

  onAddToCart(product: Flower) {
    let userEmail: any;
    if (localStorage.getItem('userEmail') != null) {
      userEmail = localStorage.getItem('userEmail')?.toString();
    } else {
      userEmail = 'guest@gmail.com';
    }
    this.flowerService.addToCart(product, userEmail);
  }
}
