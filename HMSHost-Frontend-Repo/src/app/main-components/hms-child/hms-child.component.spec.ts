import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HmsChildComponent } from './hms-child.component';

describe('HmsChildComponent', () => {
  let component: HmsChildComponent;
  let fixture: ComponentFixture<HmsChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HmsChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HmsChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
