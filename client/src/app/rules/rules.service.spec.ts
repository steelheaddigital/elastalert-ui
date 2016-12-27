/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RulesService } from './rules.service';

describe('RulesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RulesService]
    });
  });

  it('should ...', inject([RulesService], (service: RulesService) => {
    expect(service).toBeTruthy();
  }));
});
