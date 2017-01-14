import 'mocha'
import { expect } from 'chai'
import * as TypeMoq from 'typemoq';
import * as yaml from 'js-yaml';
import { GlobalConfigService } from './globalconfig_service';
import { IDataStore } from '../common/datastore';
import { ElastalertManager } from '../common/elastalert_manager';

describe('GlobalConfig Service', () => {
  describe('getGlobalConfig method', () => {
    let mockDataStore: TypeMoq.IMock<IDataStore>;
    let globalConfigService: TypeMoq.IMock<GlobalConfigService>;
    let mockElastalertManager :TypeMoq.IMock<ElastalertManager>;

    it('returns global config data', function(done) {
      mockDataStore = TypeMoq.Mock.ofType<IDataStore>();
      let globalConfig = {
        rules_folder: "testFolder"
      }
      mockDataStore.setup(x => x.read(TypeMoq.It.isAnyString())).returns(() => {
        return new Promise((resolve, reject) => {
          let yamlDoc = yaml.safeDump(globalConfig);
          resolve(yamlDoc);
        });
      });
      mockElastalertManager = TypeMoq.Mock.ofType<ElastalertManager>();
      
      var service = new GlobalConfigService(mockDataStore.object, mockElastalertManager.object);

      return service.getGlobalConfig().then((data) => {
        expect(data).to.not.be.null
        expect(data.rules_folder).to.equal('testFolder');
        mockDataStore.verify(x => x.read(TypeMoq.It.isAnyString()), TypeMoq.Times.atLeastOnce())
      
        done();
      });
    });
  });

  describe('saveGlobalConfig method', () => {
    let mockDataStore: TypeMoq.IMock<IDataStore>;
    let globalConfigService: TypeMoq.IMock<GlobalConfigService>;
    let mockElastalertManager :TypeMoq.IMock<ElastalertManager>;
    it('saves global config data and restarts elastalert', function(done) {
      mockDataStore = TypeMoq.Mock.ofType<IDataStore>();
      let globalConfig = {
        rules_folder: "testFolder"
      }
      mockDataStore.setup(x => x.write(TypeMoq.It.isAnyString(), TypeMoq.It.isAny())).returns(() => {
        return new Promise((resolve, reject) => {
          let yamlDoc = yaml.safeDump(globalConfig);
          resolve(yamlDoc);
        });
      });
      mockElastalertManager = TypeMoq.Mock.ofType<ElastalertManager>();
      mockElastalertManager.setup(x => x.restart()).returns(() => {
        return new Promise((resolve, reject) => {
          resolve();
        });
      })

      var service = new GlobalConfigService(mockDataStore.object, mockElastalertManager.object);

      return service.saveGlobalConfig(globalConfig).then((data) => {
        mockDataStore.verify(x => x.write(TypeMoq.It.isAnyString(), TypeMoq.It.isAny()), TypeMoq.Times.atLeastOnce())
        mockElastalertManager.verify(x => x.restart(), TypeMoq.Times.atLeastOnce())
        done();
      });
    });
  });
});
