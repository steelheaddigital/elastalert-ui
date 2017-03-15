/* tslint:disable:no-unused-variable */

import { BaseRequestOptions, Http, ResponseOptions, Response } from '@angular/http'
import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ElastalertAlertsService } from './elastalert-alerts.service';


describe('ElastalertAlertsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ElastalertAlertsService,
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

  it('should ...', inject([ElastalertAlertsService], (service: ElastalertAlertsService) => {
    expect(service).toBeTruthy();
  }));
});
