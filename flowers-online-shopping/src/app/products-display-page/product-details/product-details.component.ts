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
  flowers: Flower[] = [];
  currentPage = 1;

  private flowerSub: Subscription = new Subscription();

  constructor(
    public flowerService: FlowersService,
    public route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      console.log(paramMap.get('code'));
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
