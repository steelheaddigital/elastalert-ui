import 'mocha'
import { expect } from 'chai'
import { NextFunction } from 'express';
import * as Mockito from 'ts-mockito';
import { GlobalConfigService } from './globalconfig_service';
import { GlobalConfigController } from './globalconfig_controller';
import { RuleService } from '../rule/rule_service';


describe('GlobalConfig Controller', () => {
  describe('index method', () => {
    it('returns global config data', function(done) {
      let globalConfigService = Mockito.mock(GlobalConfigService);
      let globalConfig = {
        rules_folder: "testFolder"
      }

      Mockito.when(globalConfigService.getGlobalConfig()).thenReturn(
        new Promise((resolve, reject) => {
          resolve(globalConfig);
        }));
      
      let next: NextFunction;
      let req: any = { };
      let res: any = { jsend: {
        success: function(data) {
          expect(data.rules_folder).to.equal('testFolder');
          done();
        }
      }};

      let globalConfigController = new GlobalConfigController(Mockito.instance(globalConfigService));

      globalConfigController.index(req, res, next);
    });
  });

  describe('save method', function() {
    it('saves global config data', function(done) {
      let globalConfigService = Mockito.mock(GlobalConfigService);
      let globalConfig = {
        rules_folder: "testFolder"
      }

      Mockito.when(globalConfigService.saveGlobalConfig(Mockito.anything())).thenReturn(
        new Promise((resolve, reject) => {
          resolve(globalConfig);
        }));
      
      let next: NextFunction;
      let req: any = { body: globalConfig };
      let res: any = { jsend: {
        success: function(data) {
          expect(data).to.equal(true);
          done();
        }
      }};

      let globalConfigController = new GlobalConfigController(Mockito.instance(globalConfigService));

      globalConfigController.save(req, res, next);
      Mockito.verify(globalConfigService.saveGlobalConfig(globalConfig)).atLeast(1);
    });
  });
})