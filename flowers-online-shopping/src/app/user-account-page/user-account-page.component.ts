import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CreditCard, CustomerData, Order } from '../data-models/customer.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

//maybe
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-account-page',
  templateUrl: './user-account-page.component.html',
  styleUrls: ['./user-account-page.component.css']
})

export class UserAccountPageComponent implements OnInit {
    user: CustomerData = { cuID: 'Ed', user: 'Lname', email: 'jdfj@gmail', pwd: 'dkjf', phone: '972746', firstName: 'ed', lastName: 'spr', address: '1234 address ln \n Lubbock TX, 79409' };

    //change to one of these either work
    //user: CustomerData = { cuID: '', user: '', email: '', pwd: '', phone: '', firstName: '', lastName: '', address: '' };
    //user!: CustomerData;
    
    orders$!: Observable<Order[]>;

    creditCard: CreditCard = {
      cardNumber: '1234 5678 9012 3456',
      cardholderName: 'John Doe',
      expirationMonth: 12,
      expirationYear: 2024,
      cvv: '123'
    }
    //creditCard!: CreditCard;


    constructor(private authService: AuthService, private router: Router) { }


 ngOnInit(): void {
      this.authService.getCurrentUser().subscribe(user => {
        this.user = user;
        console.log(this.user);
      });
    // Comment out the dummy orders and the dummy observable when adding the API
    // ---------------------Dummy orders -------------------------
    const orders: Order[] = [
      {
        id: 1,
        date: new Date('2022-01-15T10:30:00Z'),
        items: [
          { id: 1, name: 'Rose Bouquet', price: 50 },
          { id: 2, name: 'Tulip Bouquet', price: 25 },
          { id: 3, name: 'Daisy Bouquet', price: 20 }
        ],
        total: 95
      },
      {
        id: 2,
        date: new Date('2022-02-01T14:45:00Z'),
        items: [
          { id: 1, name: 'Orchid Plant', price: 80 },
          { id: 2, name: 'Carnation Bouquet', price: 30 }
        ],
        total: 110
      },
      {
        id: 3,
        date: new Date('2022-03-05T09:15:00Z'),
        items: [
          { id: 1, name: 'Lily Bouquet', price: 40 },
          { id: 2, name: 'Sunflower Bouquet', price: 35 },
          { id: 3, name: 'Potted Succulent', price: 15 }
        ],
        total: 90
      },
      {
        id: 4,
        date: new Date('2022-04-20T18:00:00Z'),
        items: [
          { id: 1, name: 'Roses and Lilies Bouquet', price: 60 },
          { id: 2, name: 'Mixed Flower Arrangement', price: 45 }
        ],
        total: 105
      },
      {
        id: 5,
        date: new Date('2022-05-10T12:00:00Z'),
        items: [
          { id: 1, name: 'Cactus Garden', price: 30 },
          { id: 2, name: 'Hydrangea Bouquet', price: 50 },
          { id: 3, name: 'Potted Herbs', price: 25 },
          { id: 4, name: 'Small Flower Vase', price: 15 }
        ],
        total: 120
      }
    ];
    

      // Create an observable to emit the dummy orders
    this.orders$ = new Observable<Order[]>(observer => {
      observer.next(orders);
      observer.complete();
    });

    //UNCOMENT THIS WHEN COMMENTING THE DUMMY ORDERS SECTION ABOVE"
    //this.orders$ = this.authService.getOrders(); 

    //UNCOMENT THIS WHEN UNCOMMENTING "creditCard!: CreditCard;"
    // this.authService.getCreditCard().subscribe(card => {
    //   this.creditCard = card;
    //   console.log(this.creditCard);
    // });
  }

  goToEditUserPage() {
    this.router.navigate(['account', 'edit-account']);
  }
    
  goToUserHistory() {
    this.router.navigate(['account', 'history']);
  }
}

