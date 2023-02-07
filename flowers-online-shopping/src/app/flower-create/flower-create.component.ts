import { Component, OnInit } from '@angular/core';
import { Flower } from '../models/flower.model';
import { FlowersService } from '../services/flowers.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-flower-create',
    templateUrl: './flower-create.component.html',
    styleUrls: ['./flower-create.component.css']
})

export class FlowerCreateComponent implements OnInit {
    flowers: Flower[] = [];
    private flowersSub: Subscription = new Subscription;

    constructor(public flowersService: FlowersService) {}

    
}