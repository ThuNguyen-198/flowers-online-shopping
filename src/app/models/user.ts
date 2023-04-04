export interface User {
    id: number;
    name: string;
    email: string;
    address: string;
    orders: Order[];
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
  