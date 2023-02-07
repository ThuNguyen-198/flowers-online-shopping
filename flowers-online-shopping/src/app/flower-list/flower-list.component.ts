import { Component, OnInit } from '@angular/core';
import { Flower } from '../models/flower.model';
import { FlowersService } from '../services/flowers.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-flower-list',
    templateUrl: './flower-list.component.html',
    styleUrls: ['./flower-list.component.css']
})

export class FlowerListComponent implements OnInit {
    flowers: Flower[] = [];
    private flowersSub: Subscription = new Subscription;

    constructor(public flowersService: FlowersService) {}

    ngOnInit(): void {
        this.flowersService.getFlowers();
        this.flowersSub = this.flowersService.getFlowerUpdateListener()
            .subscribe( (flowers: Flower[]) => {
                this.flowers = flowers;
            })
    }

    ngOnDestroy() {
        this.flowersSub.unsubscribe();
    }
}