import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorGroupMasterComponent } from './major-group-master.component';

describe('MajorGroupMasterComponent', () => {
  let component: MajorGroupMasterComponent;
  let fixture: ComponentFixture<MajorGroupMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MajorGroupMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MajorGroupMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
