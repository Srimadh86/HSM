import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HmsCreateComponent } from './hms-create.component';

describe('HmsCreateComponent', () => {
  let component: HmsCreateComponent;
  let fixture: ComponentFixture<HmsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HmsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HmsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
