import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceLevelAddFormComponent } from './price-level-add-form.component';

describe('PriceLevelAddFormComponent', () => {
  let component: PriceLevelAddFormComponent;
  let fixture: ComponentFixture<PriceLevelAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceLevelAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceLevelAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
