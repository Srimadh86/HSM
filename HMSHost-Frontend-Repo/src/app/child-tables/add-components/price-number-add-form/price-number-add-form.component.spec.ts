import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceNumberAddFormComponent } from './price-number-add-form.component';

describe('PriceNumberAddFormComponent', () => {
  let component: PriceNumberAddFormComponent;
  let fixture: ComponentFixture<PriceNumberAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceNumberAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceNumberAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
