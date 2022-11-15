import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptMasterAddFormComponent } from './concept-master-add-form.component';

describe('ConceptMasterAddFormComponent', () => {
  let component: ConceptMasterAddFormComponent;
  let fixture: ComponentFixture<ConceptMasterAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptMasterAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptMasterAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
