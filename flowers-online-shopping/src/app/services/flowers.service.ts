import { Flower } from '../data-models/flower.model';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CartData } from '../data-models/cart.model';
import { Individual } from '../data-models/individual.model';
import { request } from 'express';

@Injectable({ providedIn: 'root' })
export class FlowersService {
  private arrayOfFlowers: Flower[] = [];
  private arrayOfIndividuals: Individual[] = [];
  private report: any = [{}];
  private arrayOfCartItems: CartData[] = [];
  private flowersUpdated = new Subject<Flower[]>();
  private cartItemsUpdated = new Subject<CartData[]>();
  private individualItemsUpdated = new Subject<Individual[]>();

  constructor(private http: HttpClient, private router: Router) {}

  //GET
  getFlowersByCategory(category: string) {
    this.http
      .get<Flower[]>('http://localhost:3000/api/products/' + category)
      .pipe(
        map((productData) => {
          return {
            flowers: productData.map((flower: any) => {
              return {
                code: flower.CODE,
                name: flower.NAME,
                image_small: flower.SMALL,
                description: flower.DESCRIPTION,
                price: flower.PRICE,
              };
            }),
          };
        })
      )
      .subscribe((transformedProductData) => {
        this.arrayOfFlowers = transformedProductData.flowers;
        this.flowersUpdated.next([...this.arrayOfFlowers]);
      });
  }

  //Actively listen to changes from servers
  getFlowerUpdateListener() {
    return this.flowersUpdated.asObservable();
  }

  getSingleBouquet(code: any) {
    return this.http.get<any>(
      'http://localhost:3000/api/products/detail/' + code
    );
  }

  addIndividuals(individual: Individual[], userEmail: any) {
    this.http
      .post('http://localhost:3000/api/products/cart/individuals', {
        email: userEmail,
        product: individual,
      })
      .subscribe((response) => {
        alert('Added individuals to cart!');
        console.log(response);
      });
  }

  getAllIndividuals(userEmail: any) {
    this.http
      .post<Individual[]>(
        'http://localhost:3000/api/products/cart/all-individuals',
        {
          userEmail: userEmail,
        }
      )
      .pipe(
        map((individualData: any) => {
          return {
            items: individualData.map((item: any) => {
              return {
                productName: item.productName,
                imageSmall: item.imageSmall,
                productPrice: item.productPrice,
                quantity: item.quantity,
              };
            }),
          };
        })
      )
      .subscribe((transformedProductData) => {
        this.arrayOfIndividuals = transformedProductData.items;
        this.individualItemsUpdated.next([...this.arrayOfIndividuals]);
      });
  }

  getIndividualsUpdateListener() {
    return this.individualItemsUpdated.asObservable();
  }

  adjustIndividualQuantity(
    newQuantity: number,
    productName: string,
    userEmail: any
  ): Observable<any> {
    return this.http.post(
      'http://localhost:3000/api/products/cart/individuals-quantity',
      {
        email: userEmail,
        productName: productName,
        quantity: newQuantity,
      }
    );
  }

  deleteIndividualItem(productName: string, userEmail: any): Observable<any> {
    return this.http.post(
      `http://localhost:3000/api/products/cart/delete-individuals`,
      {
        email: userEmail,
        productName: productName,
      }
    );
  }

  addToCart(flower: Flower, userEmail: any) {
    this.http
      .post('http://localhost:3000/api/products/cart/add', {
        email: userEmail,
        product: {
          productCode: flower.code,
          productName: flower.name,
          imageSmall: flower.image_small,
          productDescription: flower.description,
          productPrice: flower.price,
          quantity: 1,
        },
      })
      .subscribe((response) => {
        alert('Added to cart!');
        console.log(response);
      });
  }

  adjustQuantity(
    newQuantity: number,
    productCode: string,
    userEmail: any
  ): Observable<any> {
    return this.http.post('http://localhost:3000/api/products/cart/quantity', {
      email: userEmail,
      productCode: productCode,
      quantity: newQuantity,
    });
  }

  deleteCartItem(productCode: string, userEmail: any): Observable<any> {
    return this.http.delete(
      `http://localhost:3000/api/products/cart/delete/${userEmail}/${productCode}`
    );
  }

  getCartItems(userEmail: any) {
    this.http
      .post<CartData[]>('http://localhost:3000/api/products/cart/items', {
        userEmail: userEmail,
      })
      .pipe(
        map((productData: any) => {
          return {
            items: productData.map((item: any) => {
              return {
                productCode: item.productCode,
                productName: item.productName,
                imageSmall: item.imageSmall,
                productDescription: item.productDescription,
                productPrice: item.productPrice,
                quantity: item.quantity,
              };
            }),
          };
        })
      )
      .subscribe((transformedProductData) => {
        this.arrayOfCartItems = transformedProductData.items;
        this.cartItemsUpdated.next([...this.arrayOfCartItems]);
      });
  }

  getCartItemsUpdateListener() {
    return this.cartItemsUpdated.asObservable();
  }

  checkOutCart(
    customerInfo: any,
    cartItems: CartData[],
    individualItems: Individual[],
    totalPrice: number,
    userEmail: any
  ): Observable<any> {
    return this.http.post('http://localhost:3000/api/products/cart/checkout', {
      customerInfo: customerInfo,
      cartItems: cartItems,
      individualItems: individualItems,
      totalPrice: totalPrice,
      userEmail: userEmail,
    });
  }

  getReport(): Observable<any> {
    return this.http.get('http://localhost:3000/api/products/cart/all-history');
  }

  deleteCart(userEmail: string): Observable<any> {
    return this.http.post('http://localhost:3000/api/products/cart/deleteAll', {
      email: userEmail,
    });
  }
}
