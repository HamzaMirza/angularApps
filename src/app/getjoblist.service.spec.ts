import { TestBed, inject } from '@angular/core/testing';

import { GetjoblistService } from './getjoblist.service';

describe('GetjoblistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetjoblistService]
    });
  });

  it('should be created', inject([GetjoblistService], (service: GetjoblistService) => {
    expect(service).toBeTruthy();
  }));
});
