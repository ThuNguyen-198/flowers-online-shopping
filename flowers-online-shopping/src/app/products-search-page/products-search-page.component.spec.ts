import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSearchPageComponent } from './products-search-page.component.js';

describe('ProductsSearchPageComponent', () => {
  let component: ProductsSearchPageComponent;
  let fixture: ComponentFixture<ProductsSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsSearchPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
