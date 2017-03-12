/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ElastalertAlertsService } from './elastalert-alerts.service';

describe('ElastalertAlertsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElastalertAlertsService]
    });
  });

  it('should ...', inject([ElastalertAlertsService], (service: ElastalertAlertsService) => {
    expect(service).toBeTruthy();
  }));
});
