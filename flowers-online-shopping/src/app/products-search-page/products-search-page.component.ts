import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-search-page',
  templateUrl: './products-search-page.component.html',
  styleUrls: ['./products-search-page.component.css'],
})
export class ProductsSearchPageComponent implements OnInit {
  searchKey: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchKey = params['q'];
    });
  }
}
