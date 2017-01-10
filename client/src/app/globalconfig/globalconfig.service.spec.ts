/* tslint:disable:no-unused-variable */

import { BaseRequestOptions, Http, ResponseOptions, Response } from '@angular/http'
import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { GlobalConfigService, GlobalConfig } from './globalconfig.service';
import { IJsendResponse } from '../shared/base.service';
import { GLOBALCONFIG_PATH } from '../shared/api';
import { Observable } from 'rxjs';

describe('GlobalconfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GlobalConfigService,
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

  it('should inject GlobalConfigService', inject([GlobalConfigService], (service: GlobalConfigService) => {
    expect(service).toBeTruthy();
  }));

  describe('saveGlobalConfigData method', () => {
    it('should get global config data',
      inject([GlobalConfigService, MockBackend], fakeAsync((globalconfigService:GlobalConfigService, mockBackend:MockBackend) => {
        var result: GlobalConfig;
        mockBackend.connections.subscribe((c: MockConnection) => {
          expect(c.request.url).toBe(GLOBALCONFIG_PATH);
          let mockResponseBody: IJsendResponse = {
            status: 'success',
            data: {
              rules_folder: "testFolder",
              run_every: { minutes: 10 },
              buffer_time: { minutes: 10 },
              es_host: "testEsHost",
              es_port: 6556,
              es_url_prefix: "testUrlPrefix",
              use_ssl: true,
              verify_certs: true,
              es_send_get_body_as: 'testEsSendGetBodyAs',
              es_username: "testUserName",
              es_password: "testPassword",
              writeback_index: "testWriteBackIndex",
              alert_time_limit: { days: 3 }
            },
            message: ''
          };
          let response = new ResponseOptions({body: JSON.stringify(mockResponseBody)});
          c.mockRespond(new Response(response));
        });
        globalconfigService.getGlobalConfigData().subscribe(response => {
          result = response;
        });
        tick();
        expect(result.alert_time_limit.days).toBe(3);
    })))

    it('should save global config data',
      inject([GlobalConfigService, MockBackend], fakeAsync((globalconfigService:GlobalConfigService, mockBackend:MockBackend) => {
        var result: boolean;
        let globalConfigData: GlobalConfig = {
          rules_folder: "testFolder",
          run_every: { minutes: 10 },
          buffer_time: { minutes: 10 },
          es_host: "testEsHost",
          es_port: 6556,
          es_url_prefix: "testUrlPrefix",
          use_ssl: true,
          verify_certs: true,
          es_send_get_body_as: 'testEsSendGetBodyAs',
          es_username: "testUserName",
          es_password: "testPassword",
          writeback_index: "testWriteBackIndex",
          alert_time_limit: { days: 3 }
        }
        mockBackend.connections.subscribe((c: MockConnection) => {
          expect(c.request.url).toBe(GLOBALCONFIG_PATH);
          expect(c.request.headers.get('Content-Type')).toBe('application/json')
          expect(c.request.getBody()).toBe(JSON.stringify(globalConfigData));
          let mockResponseBody: IJsendResponse = {
            status: 'success',
            data: {},
            message: ''
          };
          let response = new ResponseOptions({body: JSON.stringify(mockResponseBody)});
          c.mockRespond(new Response(response));
        });
        globalconfigService.saveGlobalConfigData(globalConfigData).subscribe(response => {
          result = response;
        });
        tick();
        expect(result).toBe(true);
    })))
  })
});
