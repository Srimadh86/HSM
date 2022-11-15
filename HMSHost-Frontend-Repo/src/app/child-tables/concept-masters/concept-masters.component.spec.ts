import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptMastersComponent } from './concept-masters.component';

describe('ConceptMastersComponent', () => {
  let component: ConceptMastersComponent;
  let fixture: ComponentFixture<ConceptMastersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptMastersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptMastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
