import { Component, OnInit } from '@angular/core';
import { Flower } from '../data-models/flower.model';
import { FlowersService } from '../services/flowers.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, NgForm, Validator, Validators } from '@angular/forms';

@Component({
    selector: 'app-flower-create',
    templateUrl: './flower-create.component.html',
    styleUrls: ['./flower-create.component.css']
})

export class FlowerCreateComponent {
    entryName = '';
    entryColor = '';
    entryKind = '';
    entryOccasion = '';
    
    private flowerId: string = '';
    flower: Flower = {
        id: '',
        name: '',
        color: '',
        kind: '',
        occasion: ''
    };

    constructor(public flowersService: FlowersService) {}

    onAddFlower(form: NgForm) {
        if (form.invalid) {
          return;
        }
        this.flowersService.addFlowers(form.value.name, form.value.color, form.value.kind, form.value.occasion);
        form.resetForm();
      }
}