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

  it('should inject RulesService', inject([RulesService], (service: RulesService) => {
    expect(service).toBeTruthy();
  }));

  describe('ruleNames method', () => {
    it('should get ruleNames data',
      inject([RulesService, MockBackend], fakeAsync((rulesService:RulesService, mockBackend:MockBackend) => {
        let result: string[];
        mockBackend.connections.subscribe((c: MockConnection) => {
          expect(c.request.url).toBe(RULE_PATH);
          let mockResponseBody: IJsendResponse = {
            status: 'success',
            data: [
              'rule1',
              'rule2'
            ],
            message: ''
          };
          let response = new ResponseOptions({body: JSON.stringify(mockResponseBody)});
          c.mockRespond(new Response(response));
        });
        rulesService.ruleNames().subscribe(response => {
          result = response;
        });
        tick();
        expect(result.length).toBe(2);
        expect(result[0]).toEqual('rule1')
        expect(result[1]).toEqual('rule2')
      })
    ))
  });

  describe('loadRule method', () => {
    it('should get rule data',
      inject([RulesService, MockBackend], fakeAsync((rulesService:RulesService, mockBackend:MockBackend) => {
        let result: Object;
        mockBackend.connections.subscribe((c: MockConnection) => {
          expect(c.request.url).toBe(RULE_PATH + '/' + 'test');
          let mockResponseBody: IJsendResponse = {
            status: 'success',
            data: {
              type: 'testType'
            },
            message: ''
          };
          let response = new ResponseOptions({body: JSON.stringify(mockResponseBody)});
          c.mockRespond(new Response(response));
        });
        rulesService.loadRule('test').subscribe(response => {
          result = response;
        });
        tick();
        expect(result['type']).toEqual('testType');
      })
    ))
  });

  describe('save method', () => {
    it('should save rule data',
      inject([RulesService, MockBackend], fakeAsync((rulesService:RulesService, mockBackend:MockBackend) => {
        let result: Object;
        let model = {
          ruleData: {
            type: 'any',
            name: 'testRule'
          },
          selectedRule: 'testRule'
        }
        mockBackend.connections.subscribe((c: MockConnection) => {
          expect(c.request.url).toBe(RULE_PATH + '/' + 'testRule');
          let mockResponseBody: IJsendResponse = {
            status: 'success',
            data: { },
            message: ''
          };
          let response = new ResponseOptions({body: JSON.stringify(mockResponseBody)});
          c.mockRespond(new Response(response));
        });
        rulesService.save(model).subscribe(response => {
          result = response;
        });
        tick();
        expect(result).toBe(true);
      })
    ))

    it('should save rule data when name changes',
      inject([RulesService, MockBackend], fakeAsync((rulesService:RulesService, mockBackend:MockBackend) => {
        let result: Object;
        let model = {
          ruleData: {
            type: 'any',
            name: 'testRule'
          },
          selectedRule: 'testRule',
          previousRuleName: 'previousRuleName'
        }
        mockBackend.connections.subscribe((c: MockConnection) => {
          expect(c.request.url).toBe(RULE_PATH + '/' + 'testRule?prevrulename=previousRuleName');
          let mockResponseBody: IJsendResponse = {
            status: 'success',
            data: { },
            message: ''
          };
          let response = new ResponseOptions({body: JSON.stringify(mockResponseBody)});
          c.mockRespond(new Response(response));
        });
        rulesService.save(model).subscribe(response => {
          result = response;
        });
        tick();
        expect(result).toBe(true);
      })
    ))
  });

})