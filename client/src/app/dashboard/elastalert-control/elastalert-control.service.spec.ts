/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ElastalertControlService } from './elastalert-control.service';

describe('ElastalertControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElastalertControlService]
    });
  });

  it('should ...', inject([ElastalertControlService], (service: ElastalertControlService) => {
    expect(service).toBeTruthy();
  }));
});
