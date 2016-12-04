/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GlobalconfigService } from './globalconfig.service';

describe('GlobalconfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalconfigService]
    });
  });

  it('should ...', inject([GlobalconfigService], (service: GlobalconfigService) => {
    expect(service).toBeTruthy();
  }));
});
