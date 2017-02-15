/* tslint:disable:no-unused-variable */

import { BaseRequestOptions, Http, ResponseOptions, Response } from '@angular/http'
import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ElastalertStatusService } from './elastalert-status.service';
import { IJsendResponse } from '../../shared/base.service';
import { ELASTALERT_PATH } from '../../shared/api';
import { Observable } from 'rxjs';

describe('ElastalertStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ElastalertStatusService,
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

  it('should inject ElastalertStatusService', inject([ElastalertStatusService], (service: ElastalertStatusService) => {
    expect(service).toBeTruthy();
  }));

  describe('status method', () => {
    it('should get status from API',
      inject([ElastalertStatusService, MockBackend], fakeAsync((statusService:ElastalertStatusService, mockBackend:MockBackend) => {
        var result: boolean;
        mockBackend.connections.subscribe((c: MockConnection) => {
          expect(c.request.url).toBe(ELASTALERT_PATH + '/status');
            let mockResponseBody: IJsendResponse = {
              status: 'success',
              data: true,
              message: ''
            };
          let response = new ResponseOptions({body: JSON.stringify(mockResponseBody)});
          c.mockRespond(new Response(response));
        });
        statusService.status().subscribe(response => {
          result = response;
        });
        tick();
        expect(result).toBe(true);
    })));

  })
});
