import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueAddFormComponent } from './revenue-add-form.component';

describe('RevenueAddFormComponent', () => {
  let component: RevenueAddFormComponent;
  let fixture: ComponentFixture<RevenueAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
