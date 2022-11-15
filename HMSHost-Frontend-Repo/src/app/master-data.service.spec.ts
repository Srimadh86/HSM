import { TestBed } from '@angular/core/testing';

import { MasterDataService } from './Services/master-data.service';

describe('MasterDataService', () => {
  let service: MasterDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
