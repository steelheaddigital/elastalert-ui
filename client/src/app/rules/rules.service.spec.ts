/* tslint:disable:no-unused-variable */

import { BaseRequestOptions, Http, ResponseOptions, Response } from '@angular/http'
import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { RulesService } from './rules.service';
import { IJsendResponse } from '../shared/base.service';
import { RULE_PATH } from '../shared/api';
import { Observable } from 'rxjs';

describe('RulesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RulesService,
        BaseRequestOptions,
        MockBackend,
        {
            provide: Http,
            useFactory: function(backend, defaultOptions) {
                return new Http(backend, defaultOptions);
            },
            deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  it('should inject GlobalConfigService', inject([RulesService], (service: RulesService) => {
    expect(service).toBeTruthy();
  }));

})