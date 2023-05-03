import { Component, OnInit, HostListener } from '@angular/core';
import { FlowersService } from '../services/flowers.service';
import { Flower } from '../data-models/flower.model';
import { Subscription } from 'rxjs';
import { NgForm, FormControl } from '@angular/forms';
import { CartData } from '../data-models/cart.model';
import { CreditCard } from '../data-models/customer.model';
import { Individual } from '../data-models/individual.model';
import { Router } from '@angular/router';

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
  individualTotal: number;
  subtotal: number;
}

/*
const productsTestData : ProductDataI[] = [
  {imageLocation: "../../assets/flower1.jpg", productName: "Product 1", quantity: 1, totalPrice: 25.99},
  {imageLocation: "../../assets/flower2.jpg", productName: "Product 2", quantity: 1, totalPrice: 15.99},
];*/

const productTotalPrice: ProductTotalDataI = {
  total: 0,
  shipping: 8.95,
  tax: 0,
  individualTotal: 0,
  subtotal: 0,
};

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent implements OnInit {
  cartItems: CartData[] = [];
  private cartItemsSub: Subscription = new Subscription();
  prices = productTotalPrice;
  columnsToDisplay = ['imageLocation', 'productName', 'quantity', 'totalPrice'];
  userEmail: any;
  customerInfoForm: any = {};
  creditCardForm: any = {};
  individualItems: Individual[] = [];
  private individualSub: Subscription = new Subscription();

  constructor(public flowerService: FlowersService, private router: Router) {}

  getPrice(cartData: CartData[], individualData: Individual[]) {
    this.prices = {
      total: 0,
      shipping: 8.95,
      tax: 0,
      individualTotal: 0,
      subtotal: 0,
    };
    cartData.forEach((item) => {
      this.prices.total += item.quantity * item.productPrice;
    });

    individualData.forEach((item) => {
      this.prices.individualTotal += item.quantity * item.productPrice;
    });

    this.prices.tax = this.prices.total * 0.0825;
    this.prices.subtotal =
      this.prices.tax + this.prices.total + this.prices.individualTotal * 0.9;
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
      });

    this.flowerService.getAllIndividuals(this.userEmail);
    this.individualSub = this.flowerService
      .getIndividualsUpdateListener()
      .subscribe((individualData: Individual[]) => {
        this.individualItems = individualData;
        this.getPrice(this.cartItems, this.individualItems);
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
            this.prices = {
              total: 0,
              shipping: 8.95,
              tax: 0,
              individualTotal: 0,
              subtotal: 0,
            };
            this.cartItems = cartData;
            this.getPrice(this.cartItems, this.individualItems);
          });
      });
  }

  onAddIndividualQuantity(productName: string, currentQuantity: number) {
    let newQuantity = currentQuantity + 1;

    this.flowerService
      .adjustIndividualQuantity(newQuantity, productName, this.userEmail)
      .subscribe(() => {
        this.flowerService.getAllIndividuals(this.userEmail);
        this.individualSub = this.flowerService
          .getIndividualsUpdateListener()
          .subscribe((individualData: Individual[]) => {
            this.prices = {
              total: 0,
              shipping: 8.95,
              tax: 0,
              individualTotal: 0,
              subtotal: 0,
            };
            this.individualItems = individualData;
            this.getPrice(this.cartItems, this.individualItems);
          });
      });
  }

  onSubtractIndividualQuantity(productName: string, currentQuantity: number) {
    if (currentQuantity != 1) {
      let newQuantity = currentQuantity - 1;
      this.flowerService
        .adjustIndividualQuantity(newQuantity, productName, this.userEmail)
        .subscribe(() => {
          this.flowerService.getAllIndividuals(this.userEmail);
          this.individualSub = this.flowerService
            .getIndividualsUpdateListener()
            .subscribe((individualData: Individual[]) => {
              this.prices = {
                total: 0,
                shipping: 8.95,
                tax: 0,
                individualTotal: 0,
                subtotal: 0,
              };
              this.individualItems = individualData;
              this.getPrice(this.cartItems, this.individualItems);
            });
        });
    } else if (currentQuantity == 1) {
      this.flowerService
        .deleteIndividualItem(productName, this.userEmail)
        .subscribe(() => {
          console.log('updated cart list');
          this.flowerService.getAllIndividuals(this.userEmail);
          this.individualSub = this.flowerService
            .getIndividualsUpdateListener()
            .subscribe((individualData: Individual[]) => {
              this.prices = {
                total: 0,
                shipping: 8.95,
                tax: 0,
                individualTotal: 0,
                subtotal: 0,
              };
              this.individualItems = individualData;
              this.getPrice(this.cartItems, this.individualItems);
            });
        });
    }
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
              this.prices = {
                total: 0,
                shipping: 8.95,
                tax: 0,
                individualTotal: 0,
                subtotal: 0,
              };
              this.cartItems = cartData;
              this.getPrice(this.cartItems, this.individualItems);
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
              this.prices = {
                total: 0,
                shipping: 8.95,
                tax: 0,
                individualTotal: 0,
                subtotal: 0,
              };
              this.cartItems = cartData;
              this.getPrice(this.cartItems, this.individualItems);
            });
        });
    }
  }

  onSubmitCheckOut() {
    this.flowerService
      .checkOutCart(
        this.customerInfoForm,
        this.cartItems,
        this.individualItems,
        this.prices.subtotal,
        this.userEmail
      )
      .subscribe(() => {
        console.log('Checked out sucessfully');
        this.router.navigate(['/']);
      });
  }
}
