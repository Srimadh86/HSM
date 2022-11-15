import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MndeletecountryComponent } from './mndeletecountry.component';

describe('MndeletecountryComponent', () => {
  let component: MndeletecountryComponent;
  let fixture: ComponentFixture<MndeletecountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MndeletecountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MndeletecountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
