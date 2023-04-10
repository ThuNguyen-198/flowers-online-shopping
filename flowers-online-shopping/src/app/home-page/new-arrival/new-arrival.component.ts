import {
  Component,
  OnInit,
  ViewChildren,
  ElementRef,
  AfterViewInit,
  QueryList,
} from '@angular/core';
import { FlowersService } from 'src/app/services/flowers.service';
import { min, Subscription } from 'rxjs';
import { Flower } from 'src/app/data-models/flower.model';

@Component({
  selector: 'app-new-arrival',
  templateUrl: './new-arrival.component.html',
  styleUrls: ['./new-arrival.component.css'],
})
export class NewArrivalComponent implements OnInit, AfterViewInit {
  @ViewChildren('item') items!: QueryList<ElementRef>;
  index: number = 4;
  newArrivalFlowers: Flower[] = [];

  private flowerSub: Subscription = new Subscription();

  constructor(public flowerService: FlowersService) {}

  ngOnInit(): void {
    this.flowerService.getFlowersByCategory('ao');
    this.flowerSub = this.flowerService
      .getFlowerUpdateListener()
      .subscribe((flowerData: Flower[]) => {
        this.newArrivalFlowers = flowerData;
      });
    // console.log(items);
  }
  onClickNextButton() {
    if (this.index == 0) this.index = 4;
    this.index = this.index + Math.min(5, this.items.length - this.index - 1);
    this.items
      .toArray()
      [this.index].nativeElement.scrollIntoView({ behavior: 'smooth' });
    console.log(this.index);
  }
  onClickBackButton() {
    if (this.index == this.items.length - 1) this.index = this.index - 9;
    else this.index = this.index - Math.min(5, this.index);
    this.items
      .toArray()
      [this.index].nativeElement.scrollIntoView({ behavior: 'smooth' });
    console.log(this.index);
  }
  ngAfterViewInit() {}

  // onClickBackButton() {}
  //-----------------------------------------------
}
