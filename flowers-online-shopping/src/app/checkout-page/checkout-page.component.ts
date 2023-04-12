import { Component, OnInit } from '@angular/core';
import { FlowersService } from '../services/flowers.service';
import { Flower } from '../data-models/flower.model';
import { Subscription } from 'rxjs';
import { CartData } from '../data-models/cart.model';

interface ProductDataI {
  imageLocation: string;
  productName: string;
  quantity: number;
  totalPrice: number;
}

interface ProductTotalDataI {
  total: number;
  shipping: number;
  tax: number;
  subtotal: number;
}

/*
const productsTestData : ProductDataI[] = [
  {imageLocation: "../../assets/flower1.jpg", productName: "Product 1", quantity: 1, totalPrice: 25.99},
  {imageLocation: "../../assets/flower2.jpg", productName: "Product 2", quantity: 1, totalPrice: 15.99},
];*/

const productsTotalTestData: ProductTotalDataI = {
  total: 43.98,
  shipping: 8.95,
  tax: 4.37,
  subtotal: 52.3,
};

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent implements OnInit {
  //products = productsTestData;
  cartItems: CartData[] = [];
  private cartItemsSub: Subscription = new Subscription();
  prices = productsTotalTestData;
  columnsToDisplay = ['imageLocation', 'productName', 'quantity', 'totalPrice'];
  constructor(public flowerService: FlowersService) {}
  ngOnInit(): void {
    let userEmail: any;
    if (localStorage.getItem('userEmail') != null) {
      userEmail = localStorage.getItem('userEmail')?.toString();
    } else {
      userEmail = 'guest@gmail.com';
    }
    this.flowerService.getCartItems(userEmail);
    this.cartItemsSub = this.flowerService
      .getCartItemsUpdateListener()
      .subscribe((cartData: CartData[]) => {
        this.cartItems = cartData;
      });
  }
}
