import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickStyleComponent } from './pick-style.component';

describe('PickStyleComponent', () => {
  let component: PickStyleComponent;
  let fixture: ComponentFixture<PickStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickStyleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
