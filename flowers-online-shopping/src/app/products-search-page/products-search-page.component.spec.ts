import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSearchPageComponent } from './products-search-page.component';

describe('ProductsSearchPageComponent', () => {
  let component: UserAccountPageComponent;
  let fixture: ComponentFixture<UserAccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccountPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
