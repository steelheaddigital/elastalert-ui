import 'mocha'
import { expect } from 'chai'
import { NextFunction } from 'express';
import * as TypeMoq from 'typemoq';
import { RuleService } from './rule_service';
import { RuleController } from './rule_controller';

describe('Rule Controller', () => {
  describe('ruleNames method', () => {
    it('calls service getRuleNames method', function(done) {
      let ruleService = TypeMoq.Mock.ofType<RuleService>();

      ruleService.setup(x => x.getRuleNames()).returns(() => {
        return new Promise((resolve, reject) => {
          resolve(['rule1','rule2']);
        });
      });
      
      let next: NextFunction;
      let req: any = { };
      let res: any = { jsend: {
        success: function(data) {
          expect(data[0]).to.equal('rule1');
          expect(data[1]).to.equal('rule2');
          done();
        }
      }};

      let ruleController = new RuleController(ruleService.object);

      ruleController.ruleNames(req, res, next);
      ruleService.verify(x => x.getRuleNames(), TypeMoq.Times.atLeastOnce())
    });
  });

  describe('getRule method', () => {
    it('calls service getRule method', (done) => {
      let ruleService = TypeMoq.Mock.ofType<RuleService>();

      ruleService.setup(x => x.getRule(TypeMoq.It.isAnyString())).returns(() => {
        return new Promise((resolve, reject) => {
          resolve({
            someField: 'test1',
            someOtherField: 'test2'
          });
        });
      });
      
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

      let ruleController = new RuleController(ruleService.object);

      ruleController.getRule(req, res, next);
      ruleService.verify(x => x.getRule(TypeMoq.It.isValue<string>('rule1')), TypeMoq.Times.atLeastOnce())
    });
  });

  describe('save method', () => {
    it('calls service save method', (done) => {
      let elastalertService = TypeMoq.Mock.ofType<RuleService>();

      elastalertService.setup(x => x.saveRule(TypeMoq.It.isAnyString(), TypeMoq.It.isAny(), TypeMoq.It.isAnyString())).returns(() => {
        return new Promise((resolve, reject) => {
          resolve();
        });
      });
      
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

      let elastalertController = new RuleController(elastalertService.object);

      elastalertController.save(req, res, next);
        elastalertService.verify(x => x.saveRule(TypeMoq.It.is<string>(x => 
          x === 'rule1'),
        TypeMoq.It.is<any>(x => 
          x.someField === 'testBody'
        ), TypeMoq.It.isAny()), TypeMoq.Times.atLeastOnce())
    });
  });
})