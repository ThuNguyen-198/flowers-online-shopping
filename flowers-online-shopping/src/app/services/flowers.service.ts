import { Flower } from "../flower.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable ({providedIn: 'root'})
export class FlowersService {
    private arrayOfFlowers: Flower[] = [];
    private flowersUpdated = new Subject<Flower[]>();

    constructor(private http: HttpClient) {}

    //GET
    getFlowers(){
        this.http.get<{message: string, flowers: any}>(
            "http://localhost:3000/api/flowers"
        )
        .subscribe( (flowerData) => {
            this.arrayOfFlowers = flowerData.flowers;
            this.flowersUpdated.next([...this.arrayOfFlowers]);
        })
    }

    //Actively listen to changes from servers
    getFlowerUpdateListener() {
        return this.flowersUpdated.asObservable();
    }

    //POST
    addFlowers(nameToAdd: string, colorToAdd: string, kindToAdd: string, occasionToAdd: string){
        const flowerToAdd: Flower = {id: '', name: nameToAdd, color: colorToAdd, kind: kindToAdd, occasion: occasionToAdd};
        this.http.post<{ message: string, flowerId: string }>("http://localhost:3000/api/flowers", flowerToAdd)
      .subscribe(responseData => {
        const id = responseData.flowerId;
        flowerToAdd.id = id;
        this.arrayOfFlowers.push(flowerToAdd);
        this.flowersUpdated.next([...this.arrayOfFlowers]);
      });
    }

}