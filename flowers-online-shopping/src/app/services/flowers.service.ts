import { Flower } from '../data-models/flower.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class FlowersService {
  private arrayOfFlowers: Flower[] = [];
  private flowersUpdated = new Subject<Flower[]>();

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

  addToCart(product: Flower) {
    this.http
      .post('http://localhost:3000/api/products/cart/add', product)
      .subscribe((response) => {
        console.log('it went here');
      });
  }
}
