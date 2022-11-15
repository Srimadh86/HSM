import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDataMasterComponent } from './transaction-data-master.component';

describe('TransactionDataMasterComponent', () => {
  let component: TransactionDataMasterComponent;
  let fixture: ComponentFixture<TransactionDataMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionDataMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionDataMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
