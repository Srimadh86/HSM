import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceNumberComponent } from './price-number.component';

describe('PriceNumberComponent', () => {
  let component: PriceNumberComponent;
  let fixture: ComponentFixture<PriceNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
