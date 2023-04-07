export interface CustomerData {
  //cuID: string;
  user: string;
  email: string;
  pwd: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
}

export interface Order {
  id: number;
  date: Date;
  items: Item[];
  total: number;
}

export interface Item {
  id: number;
  name: string;
  price: number;
}
export interface CreditCard {
  cardNumber: string;
  cardholderName: string;
  expirationMonth: number;
  expirationYear: number;
  cvv: string;
}
