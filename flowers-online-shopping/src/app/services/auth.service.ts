import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EmployeeData } from "../data-models/employee.model";

@Injectable({providedIn: "root"})
export class AuthService {
    constructor(private http: HttpClient) {}

    createEmployee(regeID: string, regLoginID: string, regPwd: string, regPerms: number){
        const employeeAuthData: EmployeeData  = {eID: regeID, login_ID: regLoginID, pwd: regPwd, perms: regPerms}
        console.log(employeeAuthData)
        this.http.post("http://localhost:3000/api/user/signup/employee", employeeAuthData)
            .subscribe((response) => {
                console.log(response);
            })
    }

    login(email: string, password: string){

    }
}