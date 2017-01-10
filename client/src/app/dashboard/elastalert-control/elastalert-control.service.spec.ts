/* tslint:disable:no-unused-variable */

import { BaseRequestOptions, Http, ResponseOptions, Response } from '@angular/http'
import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ElastalertControlService } from './elastalert-control.service';
import { IJsendResponse } from '../../shared/base.service';
import { ELASTALERT_PATH } from '../../shared/api';
import { Observable } from 'rxjs';

describe('ElastalertControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ElastalertControlService,
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

  it('should inject GlobalConfigService', inject([ElastalertControlService], (service: ElastalertControlService) => {
    expect(service).toBeTruthy();
  }));

  describe('restart method', () => {
    it('should post to API',
      inject([ElastalertControlService, MockBackend], fakeAsync((globalconfigService:ElastalertControlService, mockBackend:MockBackend) => {
        var result: number;
        mockBackend.connections.subscribe((c: MockConnection) => {
          expect(c.request.url).toBe(ELASTALERT_PATH + '/restart');
            let mockResponseBody: IJsendResponse = {
              status: 'success',
              data: 123,
              message: ''
            };
          let response = new ResponseOptions({body: JSON.stringify(mockResponseBody)});
          c.mockRespond(new Response(response));
        });
        globalconfigService.restart().subscribe(response => {
          result = response;
        });
        tick();
        expect(result).toBe(123);
    })))

    describe('start method', () => {
      it('should post to API',
        inject([ElastalertControlService, MockBackend], fakeAsync((globalconfigService:ElastalertControlService, mockBackend:MockBackend) => {
          var result: number;
          mockBackend.connections.subscribe((c: MockConnection) => {
            expect(c.request.url).toBe(ELASTALERT_PATH + '/start');
            let mockResponseBody: IJsendResponse = {
                status: 'success',
                data: 123,
                message: ''
            };
            let response = new ResponseOptions({body: JSON.stringify(mockResponseBody)});
            c.mockRespond(new Response(response));
          });
          globalconfigService.start().subscribe(response => {
          result = response;
          });
          tick();
          expect(result).toBe(123);
      })))
    })

    describe('stop method', () => {
      it('should post to API',
        inject([ElastalertControlService, MockBackend], fakeAsync((globalconfigService:ElastalertControlService, mockBackend:MockBackend) => {
          var result: number;
          mockBackend.connections.subscribe((c: MockConnection) => {
          expect(c.request.url).toBe(ELASTALERT_PATH + '/stop');
          let mockResponseBody: IJsendResponse = {
              status: 'success',
              data: 123,
              message: ''
          };
          let response = new ResponseOptions({body: JSON.stringify(mockResponseBody)});
          c.mockRespond(new Response(response));
          });
          globalconfigService.stop().subscribe(response => {
          result = response;
          });
          tick();
          expect(result).toBe(123);
      })))
    })

  })
});
