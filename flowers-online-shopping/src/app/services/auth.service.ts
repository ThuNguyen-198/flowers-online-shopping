import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeData } from '../data-models/employee.model';
import { CustomerData } from '../data-models/customer.model';
import { AuthData } from '../data-models/auth.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  createEmployee(
    regeID: string,
    regLoginID: string,
    regPwd: string,
    regPerms: number
  ) {
    const employeeAuthData: EmployeeData = {
      eID: regeID,
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
    regLastName: string
  ) {
    const customerAuthData: CustomerData = {
      cuID: '',
      user: regUser,
      email: regEmail,
      pwd: regCuPwd,
      phone: regPhone,
      firstName: regFirstName,
      lastName: regLastName,
    };
    this.http
      .post('http://localhost:3000/api/user/signup/customer', customerAuthData)
      .subscribe((response) => {
        console.log(response);
      });
  }

  login(loginEmail: string, loginPassword: string) {
    const authData: AuthData = { email: loginEmail, pwd: loginPassword };
    this.http
      .post('http://localhost:3000/api/user/login', authData)
      .subscribe((response) => {
        //Direct users to homepage if login successful
        this.router.navigate(['/']);
      });
  }
}
