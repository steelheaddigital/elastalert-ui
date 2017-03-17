import 'mocha'
import { expect } from 'chai'
import { NextFunction } from 'express';
import * as Mockito from 'ts-mockito';
import { RuleService } from './rule_service';
//import {RuleService } from './rule2';
import { RuleController } from './rule_controller';

describe('Rule Controller', () => {
  describe('ruleNames method', () => {
    it('calls service getRuleNames method', function(done) {
      let ruleService = Mockito.mock(RuleService);

      Mockito.when(ruleService.getRuleNames()).thenReturn(
        new Promise((resolve, reject) => {
          resolve(['rule1','rule2']);
        }));
      
      let next: NextFunction;
      let req: any = { };
      let res: any = { jsend: {
        success: function(data) {
          expect(data[0]).to.equal('rule1');
          expect(data[1]).to.equal('rule2');
          done();
        }
      }};

      let ruleController = new RuleController(Mockito.instance(ruleService));

      ruleController.ruleNames(req, res, next);
      Mockito.verify(ruleService.getRuleNames()).times(1);
    });
  });

  describe('getRule method', () => {
    it('calls service getRule method', (done) => {
      let ruleService = Mockito.mock(RuleService);

      Mockito.when(ruleService.getRule(Mockito.anyString())).thenReturn(
        new Promise((resolve, reject) => {
          resolve({
            someField: 'test1',
            someOtherField: 'test2'
          });
        }));
      
      let next: NextFunction;
      let req: any = { 
        params: {
          rulename: 'rule1'
        }
      };
      let res: any = { jsend: {
        success: function(data) {
          expect(data.someField).to.equal('test1')
          expect(data.someOtherField).to.equal('test2')
          done();
        }
      }};

      let ruleController = new RuleController(Mockito.instance(ruleService));

      ruleController.getRule(req, res, next);
      Mockito.verify(ruleService.getRule('rule1')).atLeast(1);
    });
  });

  describe('save method', () => {
    it('calls service save method', (done) => {
      let ruleService = Mockito.mock(RuleService);

      Mockito.when(ruleService.saveRule(Mockito.anyString(), Mockito.anything(), Mockito.anyString())).thenReturn(
        new Promise((resolve, reject) => {
          resolve();
        }));
      
      let next: NextFunction;
      let req: any = { 
        params: {
          rulename: 'rule1'
        },
        body: { 
          someField: 'testBody'
        },
        query: {
          prevrulename: ''
        }
      };
      let res: any = { jsend: {
        success: function(data) {
          console.log('success called')
          expect(data).to.equal(true);
          done();
        }
      }};

      let rulesController = new RuleController(Mockito.instance(ruleService);

      rulesController.save(req, res, next);
      Mockito.verify(ruleService.saveRule('rule1', Mockito.deepEqual(req.body), Mockito.anything())).atLeast(1)
    });
  });
})

