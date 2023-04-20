import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlowersService } from '../services/flowers.service';
import { Flower } from '../data-models/flower.model';
import Fuse from 'fuse.js';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-products-search-page',
    templateUrl: './products-search-page.component.html',
    styleUrls: ['./products-search-page.component.css'],
})
export class ProductsSearchPageComponent implements OnInit {
    searchKey: string = '';
    products: Flower[] = [];
    searchResults: any[] = [];
    flowers: Flower[] = [];
    originalSearchKey: string = '';
    
    fuseOptions: Fuse.IFuseOptions<any> = {
        keys: [
            {
                name: 'name',
                weight: 0.9
            },
            {
                name: 'description',
                weight: 0.1
            }
        ],
        includeScore: true,
        threshold: 0.5,
    };


    private flowerSub: Subscription = new Subscription();
    
    constructor(
        private route: ActivatedRoute,
        private flowerService: FlowersService,
        private router: Router
    ) {}

    ngOnInit(): void {
        const categories = ['all', 'sy', 'lr', 'bd', 'ao'];
        let allFlowers: Flower[] = [];

        categories.forEach(category => {
            this.flowerService.getFlowersByCategory(category);
        });

        this.flowerSub = this.flowerService.getFlowerUpdateListener()
            .subscribe((flowerData: Flower[]) => {
                allFlowers = allFlowers.concat(flowerData);

                if (allFlowers.length === categories.length * flowerData.length) {
                    this.flowers = allFlowers;
                    console.log('Flower data:', allFlowers);
                    this.route.queryParams.subscribe((params) => {
                        this.searchKey = params['q'];
                        this.originalSearchKey = this.searchKey; 
                        this.searchProducts(this.flowers);
                    });
                }
            });
    }
   
    searchProducts(products: Flower[]): void {
        const fuse = new Fuse(products, this.fuseOptions);
        const searchResults = fuse.search(this.searchKey);
        this.searchResults = searchResults.map((result) => {
            return {
                name: result.item.name,
                description: result.item.description,
                image_small: result.item.image_small,
                price: result.item.price,
                code: result.item.code
            };
        });
    }
    
    getSearchKey() {
        this.originalSearchKey = this.searchKey; 
        if (this.searchKey.trim() !== '') {
            this.router.navigate(['/search'], {
                queryParams: { q: this.searchKey },
            });
        }
    }
}
