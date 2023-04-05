import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCustomComponent } from './product-custom.component';

describe('ProductCustomComponent', () => {
  let component: ProductCustomComponent;
  let fixture: ComponentFixture<ProductCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCustomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
