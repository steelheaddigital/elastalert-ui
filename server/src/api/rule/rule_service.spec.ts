import 'mocha'
import { expect } from 'chai'
import * as Mockito from 'ts-mockito';
import * as yaml from 'js-yaml';
import { RuleService } from './rule_service';
import { IDataStore } from '../common/datastore';
import { ElastalertManager } from '../common/elastalert_manager';

describe('Rule Service', () => {
  describe('getRuleNames method', () => {
    let mockDataStore: IDataStore;
    let ruleService: RuleService;
    let mockElastalertManager: ElastalertManager;

    it('returns rule names', function(done) {
      mockDataStore = Mockito.mock(TestDataStore);
      let rule1 = {
        name: "test rule one"
      }
      let rule2 = {
        name: "test rule two"
      }
      let notARule = { }

      Mockito.when(mockDataStore.read('/opt/elastalert/rules/rule1')).thenReturn(
        new Promise((resolve, reject) => {
          let yamlDoc = yaml.safeDump(rule1);
          resolve(yamlDoc);
        }));
      Mockito.when(mockDataStore.read('/opt/elastalert/rules/rule2')).thenReturn(
        new Promise((resolve, reject) => {
          let yamlDoc = yaml.safeDump(rule2);
          resolve(yamlDoc);
        }));
      Mockito.when(mockDataStore.read('/opt/elastalert/rules/notARule')).thenReturn(
        new Promise((resolve, reject) => {
          resolve(undefined);
        }));
      Mockito.when(mockDataStore.readdir(Mockito.anyString())).thenReturn(
        new Promise<string[]>((resolve, reject) => {
          let ruleNames = ['rule1', 'rule2', 'notARule']
          resolve(ruleNames);
        }));
      mockElastalertManager = Mockito.mock(ElastalertManager);
      
      var service = new RuleService(Mockito.instance(mockDataStore), Mockito.instance(mockElastalertManager));

      return service.getRuleNames().then((data) => {
        expect(data.length).to.equal(2)
        expect(data[0]).to.equal('test rule one');
        expect(data[1]).to.equal('test rule two');
        Mockito.verify(mockDataStore.readdir(Mockito.anyString())).atLeast(1);
        Mockito.verify(mockDataStore.read(Mockito.anyString())).atLeast(1);

        done();
      });
    });
  });

  describe('getRule method', () => {
    let mockDataStore: IDataStore;
    let ruleService: RuleService;
    let mockElastalertManager: ElastalertManager;

    it('returns rule data', function(done) {
      mockDataStore = Mockito.mock(TestDataStore);
      let ruleData = {
        rules_folder: "testFolder"
      }
      Mockito.when(mockDataStore.read(Mockito.anyString())).thenReturn(
        new Promise((resolve, reject) => {
          let yamlDoc = yaml.safeDump(ruleData);
          resolve(yamlDoc);
        }));
      mockElastalertManager = Mockito.mock(ElastalertManager);
      
      var service = new RuleService(Mockito.instance(mockDataStore), Mockito.instance(mockElastalertManager));

      return service.getRule('test rule').then((data) => {
        expect(data).to.not.be.null
        expect(data.rules_folder).to.equal('testFolder');
        Mockito.verify(mockDataStore.read('/opt/elastalert/rules/test_rule.yaml')).atLeast(1)
      
        done();
      });
    });
  });

  describe('saveGlobalConfig method', () => {
    let mockDataStore: IDataStore;
    let ruleService: RuleService;
    let mockElastalertManager: ElastalertManager;

    it('saves  data and restarts elastalert', function(done) {
      mockDataStore = Mockito.mock(TestDataStore);
      let ruleData = {
        rules_folder: "testFolder",
        null_field: null,
        undefined_field: undefined
      }
      Mockito.when(mockDataStore.write(Mockito.anyString(), Mockito.anything())).thenReturn(
        new Promise((resolve, reject) => {
          let yamlDoc = "rules_folder: 'TestFolder'\n"
          let ruleData = yaml.safeLoad(yamlDoc);
          resolve(ruleData);
        }));
      mockElastalertManager = Mockito.mock(ElastalertManager);
      Mockito.when(mockElastalertManager.restart()).thenReturn(
        new Promise((resolve, reject) => {
          resolve();
        }));

      var service = new RuleService(Mockito.instance(mockDataStore), Mockito.instance(mockElastalertManager));

      return service.saveRule('test rule', ruleData, null).then((data) => {
        Mockito.verify(mockDataStore.write('/opt/elastalert/rules/test_rule.yaml', Mockito.anything())).atLeast(1);
        Mockito.verify(mockElastalertManager.restart()).atLeast(1);
        done();
      });
    });

    it('saves  data and deletes previous rule file if name changed', function(done) {
      mockDataStore = Mockito.mock(TestDataStore);
      let ruleData = {
        rules_folder: "testFolder",
        null_field: null,
        undefined_field: undefined
      }
      Mockito.when(mockDataStore.write(Mockito.anyString(), Mockito.anything())).thenReturn(
        new Promise((resolve, reject) => {
          let yamlDoc = "rules_folder: 'TestFolder'\n"
          let ruleData = yaml.safeLoad(yamlDoc);
          resolve(ruleData);
        }));
      Mockito.when(mockDataStore.delete(Mockito.anyString())).thenReturn(
        new Promise((resolve,reject) => {
          resolve();
        }));
      mockElastalertManager = Mockito.mock(ElastalertManager);
      Mockito.when(mockElastalertManager.restart()).thenReturn(
        new Promise((resolve, reject) => {
          resolve();
        }));

      var service = new RuleService(Mockito.instance(mockDataStore), Mockito.instance(mockElastalertManager));

      return service.saveRule('test rule', ruleData, "previous rule").then((data) => {
        Mockito.verify(mockDataStore.write('/opt/elastalert/rules/test_rule.yaml', Mockito.anything())).atLeast(1);
        Mockito.verify(mockDataStore.delete('/opt/elastalert/rules/previous_rule.yaml')).atLeast(1);
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
