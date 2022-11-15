import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueTypeMasterComponent } from './revenue-type-master.component';

describe('RevenueTypeMasterComponent', () => {
  let component: RevenueTypeMasterComponent;
  let fixture: ComponentFixture<RevenueTypeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueTypeMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
