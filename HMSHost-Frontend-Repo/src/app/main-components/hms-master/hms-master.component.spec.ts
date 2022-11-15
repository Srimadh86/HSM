import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HmsMasterComponent } from './hms-master.component';

describe('HmsMasterComponent', () => {
  let component: HmsMasterComponent;
  let fixture: ComponentFixture<HmsMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HmsMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HmsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
