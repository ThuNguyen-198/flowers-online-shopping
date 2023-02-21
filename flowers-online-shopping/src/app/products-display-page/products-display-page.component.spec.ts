import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDisplayPageComponent } from './products-display-page.component';

describe('ProductsDisplayPageComponent', () => {
  let component: ProductsDisplayPageComponent;
  let fixture: ComponentFixture<ProductsDisplayPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsDisplayPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsDisplayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
