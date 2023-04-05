import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIndividualsComponent } from './product-individuals.component';

describe('ProductIndividualsComponent', () => {
  let component: ProductIndividualsComponent;
  let fixture: ComponentFixture<ProductIndividualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductIndividualsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductIndividualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
