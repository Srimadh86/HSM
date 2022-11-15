import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceAddFormComponent } from './sequence-add-form.component';

describe('SequenceAddFormComponent', () => {
  let component: SequenceAddFormComponent;
  let fixture: ComponentFixture<SequenceAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SequenceAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
