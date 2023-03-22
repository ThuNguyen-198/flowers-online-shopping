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
  getFlowers() {
    this.http
      .get<Flower[]>('http://localhost:3000/api/products')
      .pipe(
        map((productData) => {
          console.log(productData);
          return {
            flowers: productData.map((flower: any) => {
              return {
                code: flower.CODE,
                name: flower.NAME,
                large: flower.LARGE,
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
}
