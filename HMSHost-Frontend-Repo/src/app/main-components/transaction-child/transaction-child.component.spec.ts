import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionChildComponent } from './transaction-child.component';

describe('TransactionChildComponent', () => {
  let component: TransactionChildComponent;
  let fixture: ComponentFixture<TransactionChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
