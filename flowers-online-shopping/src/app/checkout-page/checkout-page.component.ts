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
  total: 0,
  shipping: 8.95,
  tax: 0,
  subtotal: 0,
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
  userEmail: any;

  constructor(public flowerService: FlowersService) {}

  getPrice(cartData: CartData[]) {
    cartData.forEach((item) => {
      this.prices.total += item.quantity * item.productPrice;
    });
    this.prices.tax = this.prices.total * 0.0825;
    this.prices.subtotal = this.prices.tax + this.prices.total;
  }

  ngOnInit(): void {
    if (localStorage.getItem('userEmail') != null) {
      this.userEmail = localStorage.getItem('userEmail')?.toString();
    } else {
      this.userEmail = 'guest@gmail.com';
    }

    this.flowerService.getCartItems(this.userEmail);
    this.cartItemsSub = this.flowerService
      .getCartItemsUpdateListener()
      .subscribe((cartData: CartData[]) => {
        this.cartItems = cartData;
        this.getPrice(cartData);
      });
  }

  onAddItem(productCode: string, currentQuantity: number) {
    let newQuantity = currentQuantity + 1;

    this.flowerService
      .adjustQuantity(newQuantity, productCode, this.userEmail)
      .subscribe(() => {
        this.flowerService.getCartItems(this.userEmail);
        this.cartItemsSub = this.flowerService
          .getCartItemsUpdateListener()
          .subscribe((cartData: CartData[]) => {
            this.prices.total = 0;
            this.cartItems = cartData;
            this.getPrice(cartData);
          });
      });
  }

  onSubtractItem(productCode: string, currentQuantity: number) {
    if (currentQuantity != 1) {
      let newQuantity = currentQuantity - 1;
      this.flowerService
        .adjustQuantity(newQuantity, productCode, this.userEmail)
        .subscribe(() => {
          this.flowerService.getCartItems(this.userEmail);
          this.cartItemsSub = this.flowerService
            .getCartItemsUpdateListener()
            .subscribe((cartData: CartData[]) => {
              this.prices.total = 0;
              this.cartItems = cartData;
              this.getPrice(cartData);
            });
        });
    } else if (currentQuantity == 1) {
      this.flowerService
        .deleteCartItem(productCode, this.userEmail)
        .subscribe(() => {
          console.log('updated cart list');
          this.flowerService.getCartItems(this.userEmail);
          this.cartItemsSub = this.flowerService
            .getCartItemsUpdateListener()
            .subscribe((cartData: CartData[]) => {
              this.prices.total = 0;
              this.cartItems = cartData;
              this.getPrice(cartData);
            });
        });
    }
  }
}
