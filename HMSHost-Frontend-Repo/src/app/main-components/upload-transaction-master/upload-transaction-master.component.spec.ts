import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTransactionMasterComponent } from './upload-transaction-master.component';

describe('UploadTransactionMasterComponent', () => {
  let component: UploadTransactionMasterComponent;
  let fixture: ComponentFixture<UploadTransactionMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadTransactionMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTransactionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
