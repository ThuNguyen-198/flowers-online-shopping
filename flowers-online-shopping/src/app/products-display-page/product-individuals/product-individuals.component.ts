import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Flower } from 'src/app/data-models/flower.model';
import { FlowersService } from 'src/app/services/flowers.service';

interface Individual {
  img: string;
  name: string;
  quantity: 1;
}

@Component({
  selector: 'app-product-individuals',
  templateUrl: './product-individuals.component.html',
  styleUrls: ['./product-individuals.component.css'],
})
export class ProductIndividualsComponent implements OnInit {
  searchKey = '';
  individualArray: Individual[] = [];
  categories = ['All', 'Rose', 'Daisy', 'Sun Flower', 'Tulip', 'Lily', 'Leaf'];
  selectedCategory = 'All';
  showSearchBox = false;

  individuals = [
    {
      img: '../../../assets/individuals/Alstroemeria.jpg',
      name: 'Alstroemeria',
    },
    {
      img: '../../../assets/individuals/aquilegia.jpg',
      name: 'Aquilegia',
    },
    {
      img: '../../../assets/individuals/Aster.jpg',
      name: 'Aster',
    },
    {
      img: '../../../assets/individuals/carnation.jpg',
      name: 'Carnation',
    },
    {
      img: '../../../assets/individuals/chrysanthemum.jpg',
      name: 'Chrysanthemum',
    },
    {
      img: '../../../assets/individuals/coneflower.jpg',
      name: 'Coneflower',
    },
    {
      img: '../../../assets/individuals/cornflower.jpg',
      name: 'Cornflower',
    },
    {
      img: '../../../assets/individuals/cosmos.jpg',
      name: 'Cosmos',
    },
    {
      img: '../../../assets/individuals/Craspedia.jpg',
      name: 'Craspedia',
    },
    {
      img: '../../../assets/individuals/Daffodil.jpg',
      name: 'Daffodil',
    },
    {
      img: '../../../assets/individuals/dahlia.jpg',
      name: 'Dahlia',
    },
    {
      img: '../../../assets/individuals/daisy.jpg',
      name: 'Daisy',
    },
    {
      img: '../../../assets/individuals/Daucus-Carota.jpg',
      name: 'Daucus Carota',
    },
    {
      img: '../../../assets/individuals/Eustoma.jpg',
      name: 'Eustoma',
    },
    {
      img: '../../../assets/individuals/gerbera.jpg',
      name: 'Gerbera',
    },
    {
      img: '../../../assets/individuals/Hydrangea.jpg',
      name: 'Hydrangea',
    },
    {
      img: '../../../assets/individuals/iris.jpg',
      name: 'Iris',
    },
    {
      img: '../../../assets/individuals/Lilac.jpg',
      name: 'Lilac',
    },
    {
      img: '../../../assets/individuals/lily.jpg',
      name: 'Lily',
    },
    {
      img: '../../../assets/individuals/lotus.jpg',
      name: 'Lotus',
    },
    {
      img: '../../../assets/individuals/marigold.jpg',
      name: 'Marigold',
    },
    {
      img: '../../../assets/individuals/orchids.jpg',
      name: 'Orchids',
    },
    {
      img: '../../../assets/individuals/Paeonia.jpg',
      name: 'Paeonia',
    },
    {
      img: '../../../assets/individuals/Pansy.jpg',
      name: 'Pansy',
    },
    {
      img: '../../../assets/individuals/peony.jpg',
      name: 'Peony',
    },
    {
      img: '../../../assets/individuals/Poppy.jpg',
      name: 'Poppy',
    },
    {
      img: '../../../assets/individuals/rose.jpg',
      name: 'Rose',
    },
    {
      img: '../../../assets/individuals/sunflower.jpg',
      name: 'Sunflower',
    },
    {
      img: '../../../assets/individuals/Thistle-plant.jpg',
      name: 'Thistle Plant',
    },
    {
      img: '../../../assets/individuals/tulip.jpg',
      name: 'Tulip',
    },
  ];

  private flowerSub: Subscription = new Subscription();

  constructor(public flowerService: FlowersService) {}

  ngOnInit(): void {}

  onAddIndividuals(newIndividual: any) {
    let individual: Individual = {
      img: newIndividual.img,
      name: newIndividual.name,
      quantity: 1,
    };
    this.individualArray.push(individual);
    console.log(this.individualArray);
  }

  onAddQuantity(index: number) {
    this.individualArray[index].quantity += 1;
  }

  onSubtractQuantity(index: number) {
    if (this.individualArray[index].quantity > 1)
      this.individualArray[index].quantity -= 1;
  }
}
