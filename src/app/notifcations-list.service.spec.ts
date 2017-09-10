import { TestBed, inject } from '@angular/core/testing';

import { NotifcationsListService } from './notifcations-list.service';

describe('NotifcationsListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotifcationsListService]
    });
  });

  it('should be created', inject([NotifcationsListService], (service: NotifcationsListService) => {
    expect(service).toBeTruthy();
  }));
});
