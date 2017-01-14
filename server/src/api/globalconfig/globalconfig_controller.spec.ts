import 'mocha'
import { expect } from 'chai'
import { NextFunction } from 'express';
import * as TypeMoq from 'typemoq';
import { GlobalConfigService } from './globalconfig_service';
import { GlobalConfigController } from './globalconfig_controller';


describe('GlobalConfig Controller', () => {
  describe('index method', () => {
    it('returns global config data', function(done) {
      let globalConfigService = TypeMoq.Mock.ofType(GlobalConfigService);
      let globalConfig = {
        rules_folder: "testFolder"
      }
      globalConfigService.setup(x => x.getGlobalConfig()).returns(() => {
        return new Promise((resolve, reject) => {
          resolve(globalConfig);
        });
      });
      
      let next: NextFunction;
      let req: any = { };
      let res: any = { jsend: {
        success: function(data) {
          expect(data.rules_folder).to.equal('testFolder');
          done();
        }
      }};

      let globalConfigController = new GlobalConfigController(globalConfigService.object);

      globalConfigController.index(req, res, next);
    });
  });

  describe('save method', function() {
    it('saves global config data', function(done) {
      let globalConfigService = TypeMoq.Mock.ofType(GlobalConfigService);
      let globalConfig = {
        rules_folder: "testFolder"
      }
      globalConfigService.setup(x => x.saveGlobalConfig(TypeMoq.It.isAny())).returns(() => {
        return new Promise((resolve, reject) => {
          resolve(globalConfig);
        });
      });
      
      let next: NextFunction;
      let req: any = { body: globalConfig };
      let res: any = { jsend: {
        success: function(data) {
          expect(data).to.equal(true);
          done();
        }
      }};

      let globalConfigController = new GlobalConfigController(globalConfigService.object);

      globalConfigController.save(req, res, next);
      globalConfigService.verify(x => x.saveGlobalConfig(TypeMoq.It.is<any>(x => 
        x.rules_folder === "testFolder"
      )), TypeMoq.Times.atLeastOnce())
    });
  });
})