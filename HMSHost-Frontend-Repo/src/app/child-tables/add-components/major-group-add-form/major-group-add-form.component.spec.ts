import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorGroupAddFormComponent } from './major-group-add-form.component';

describe('MajorGroupAddFormComponent', () => {
  let component: MajorGroupAddFormComponent;
  let fixture: ComponentFixture<MajorGroupAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MajorGroupAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MajorGroupAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
