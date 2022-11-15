import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmodifycountryComponent } from './addmodifycountry.component';

describe('AddmodifycountryComponent', () => {
  let component: AddmodifycountryComponent;
  let fixture: ComponentFixture<AddmodifycountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmodifycountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmodifycountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
