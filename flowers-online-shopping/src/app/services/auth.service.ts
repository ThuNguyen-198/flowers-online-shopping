import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeData } from '../data-models/employee.model';
import { CreditCard, CustomerData, Order } from '../data-models/customer.model';
import { AuthData } from '../data-models/auth.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string = '';
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated: boolean = false;
  private tokenTimer: any;
  public isAdmin = new Subject<boolean>();
  private adminStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  createEmployee(
    regeID: string,
    regLoginID: string,
    regPwd: string,
    regPerms: number
  ) {
    const employeeAuthData: EmployeeData = {
      //eID: regeID,
      login_ID: regLoginID,
      pwd: regPwd,
      perms: regPerms,
    };
    console.log(employeeAuthData);
    this.http

      .post('http://localhost:3000/api/user/signup/employee', employeeAuthData)
      .subscribe((response) => {
        console.log(response);
      });
  }

  createCustomer(
    regUser: string,
    regEmail: string,
    regCuPwd: string,
    regPhone: string,
    regFirstName: string,
    regLastName: string,
    regAddress: string
  ) {
    const customerAuthData: CustomerData = {
      // this should be struck
      //cuID: '',
      user: regUser,
      email: regEmail,
      pwd: regCuPwd,
      phone: regPhone,
      firstName: regFirstName,
      lastName: regLastName,
      address: regAddress,
      isAdmin: false,
    };

    this.http
      .post('http://localhost:3000/api/user/signup/customer', customerAuthData)
      .subscribe((response) => {
        this.router.navigate(['/login']);
      });
  }

  getToken() {
    return this.token;
  }
  getIsAdminListener() {
    return this.adminStatusListener.asObservable();
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAdmin() {
    console.log('from service: ' + this.isAdmin);
    return this.isAdmin.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  login(loginEmail: string, loginPassword: string) {
    const authData: AuthData = {
      email: loginEmail,
      pwd: loginPassword,
    };
    this.http
      .post<{ token: string; expiresIn: number; isAdmin: any }>(
        'http://localhost:3000/api/user/login',
        authData
      )
      .subscribe((response) => {
        const token = response.token;
        this.token = token;

        if (token) {
          const expiresInDuration = response.expiresIn;
          setTimeout(() => {
            this.logout();
          }, expiresInDuration * 1000);

          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );

          if (response.isAdmin == 'true') {
            this.isAdmin.next(true);
          } else {
            this.isAdmin.next(false);
          }

          this.saveAuthData(
            this.token,
            expirationDate,
            this.isAdmin,
            loginEmail
          );

          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          //Direct users to homepage if login successful
          this.router.navigate(['/']);
        }
      });
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  getCurrentUser(): Observable<CustomerData> {
    return this.http.get<CustomerData>(
      'http://localhost:3000/api/user/current-user'
    );
  }

  getOrders(): Observable<Order[]> {
    const userId = localStorage.getItem('userId');
    return this.http.get<Order[]>(
      'http://localhost:3000/api/user/current-user/orders'
    );
  }

  getCreditCard(): Observable<CreditCard> {
    const url = `http://localhost:3000/api/user/current-user/credit-card`;
    return this.http.get<CreditCard>(url);
  }

  private setAuthTimer(duration: number) {
    //Logout when token is not valid anymore
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    isAdmin: any,
    email: string
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('isAdmin', isAdmin.toString());
    localStorage.setItem('userEmail', email);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');

    if (!token || !expirationDate) {
      return;
    }

    return {
      token: token,
      expirationDate: new Date(expirationDate),
    };
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userEmail');
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }
}
