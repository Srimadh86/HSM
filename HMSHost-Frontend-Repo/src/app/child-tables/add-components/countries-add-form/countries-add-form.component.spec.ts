import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesAddFormComponent } from './countries-add-form.component';

describe('CountriesAddFormComponent', () => {
  let component: CountriesAddFormComponent;
  let fixture: ComponentFixture<CountriesAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountriesAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
