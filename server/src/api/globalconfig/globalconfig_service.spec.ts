import 'mocha'
import { expect } from 'chai'
import * as Mockito from 'ts-mockito';
import * as yaml from 'js-yaml';
import { GlobalConfigService } from './globalconfig_service';
import { IDataStore } from '../common/datastore';
import { ElastalertManager } from '../common/elastalert_manager';

describe('GlobalConfig Service', () => {
  describe('getGlobalConfig method', () => {
    let mockDataStore: IDataStore;
    let globalConfigService: GlobalConfigService;
    let mockElastalertManager: ElastalertManager;

    it('returns global config data', function(done) {
      mockDataStore = Mockito.mock(TestDataStore);
      let globalConfig = {
        rules_folder: "testFolder"
      }

      Mockito.when(mockDataStore.read(Mockito.anyString())).thenReturn(
        new Promise((resolve, reject) => {
          let yamlDoc = yaml.safeDump(globalConfig);
          resolve(yamlDoc);
        }));
      mockElastalertManager = Mockito.mock(ElastalertManager);
      
      var service = new GlobalConfigService(Mockito.instance(mockDataStore), Mockito.instance(mockElastalertManager));

      return service.getGlobalConfig().then((data) => {
        expect(data).to.not.be.null
        expect(data.rules_folder).to.equal('testFolder');
        Mockito.verify(mockDataStore.read(Mockito.anyString())).atLeast(1);
        
        done();
      });
    });
  });

  describe('saveGlobalConfig method', () => {
    let mockDataStore: IDataStore
    let globalConfigService: GlobalConfigService;
    let mockElastalertManager: ElastalertManager;

    it('saves global config data and restarts elastalert', function(done) {
      mockDataStore = Mockito.mock(TestDataStore);
      let globalConfig = {
        rules_folder: "testFolder"
      }
      Mockito.when(mockDataStore.write(Mockito.anyString(), Mockito.anything())).thenReturn(
        new Promise((resolve, reject) => {
          let yamlDoc = yaml.safeDump(globalConfig);
          resolve(yamlDoc);
        }));
      mockElastalertManager = Mockito.mock(ElastalertManager);
      Mockito.when(mockElastalertManager.restart()).thenReturn(
        new Promise((resolve, reject) => {
          resolve();
        }))

      var service = new GlobalConfigService(Mockito.instance(mockDataStore), Mockito.instance(mockElastalertManager));

      return service.saveGlobalConfig(globalConfig).then((data) => {
        Mockito.verify(mockDataStore.write(Mockito.anyString(), Mockito.anything())).atLeast(1);
        Mockito.verify(mockElastalertManager.restart()).atLeast(1);
        done();
      });
    });
  });
});

class TestDataStore implements IDataStore{
  write(fileName: string, data: any): Promise<any>{
    return new Promise<any>((resolve, reject) => {
    });
  }
  read(fileName: string): Promise<string>{
    return new Promise<string>((resolve, reject) => {
    });
  }
  delete(fileName: string): Promise<any>{
    return new Promise<any>((resolve, reject) => {
    });
  }
  readdir(path: string): Promise<string[]>{
    return new Promise<string[]>((resolve, reject) => {
    });
  }
}