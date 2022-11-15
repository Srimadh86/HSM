import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMasterDataComponent } from './upload-master-data.component';

describe('UploadMasterDataComponent', () => {
  let component: UploadMasterDataComponent;
  let fixture: ComponentFixture<UploadMasterDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadMasterDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMasterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
