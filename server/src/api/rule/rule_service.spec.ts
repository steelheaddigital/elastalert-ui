import 'mocha'
import { expect } from 'chai'
import * as TypeMoq from 'typemoq';
import * as yaml from 'js-yaml';
import { RuleService } from './rule_service';
import { IDataStore } from '../common/datastore';
import { ElastalertManager } from '../common/elastalert_manager';

describe('Rule Service', () => {
  describe('getRuleNames method', () => {
    let mockDataStore: TypeMoq.IMock<IDataStore>;
    let ruleService: TypeMoq.IMock<RuleService>;
    let mockElastalertManager :TypeMoq.IMock<ElastalertManager>;

    it('returns rule names', function(done) {
      mockDataStore = TypeMoq.Mock.ofType<IDataStore>();
      let rule1 = {
        name: "test rule one"
      }
      let rule2 = {
        name: "test rule two"
      }
      let notARule = { }

      mockDataStore.setup(x => x.read(TypeMoq.It.isValue('/opt/elastalert/rules/rule1'))).returns(() => {
        return new Promise((resolve, reject) => {
          let yamlDoc = yaml.safeDump(rule1);
          resolve(yamlDoc);
        });
      });
      mockDataStore.setup(x => x.read(TypeMoq.It.isValue('/opt/elastalert/rules/rule2'))).returns(() => {
        return new Promise((resolve, reject) => {
          let yamlDoc = yaml.safeDump(rule2);
          resolve(yamlDoc);
        });
      });
      mockDataStore.setup(x => x.read(TypeMoq.It.isValue('/opt/elastalert/rules/notARule'))).returns(() => {
        return new Promise((resolve, reject) => {
          resolve(undefined);
        });
      });
      mockDataStore.setup(x => x.readdir(TypeMoq.It.isAnyString())).returns(() => {
        return new Promise<string[]>((resolve, reject) => {
          let ruleNames = ['rule1', 'rule2', 'notARule']
          resolve(ruleNames);
        });
      });
      mockElastalertManager = TypeMoq.Mock.ofType<ElastalertManager>();
      
      var service = new RuleService(mockElastalertManager.object, mockDataStore.object);

      return service.getRuleNames().then((data) => {
        expect(data.length).to.equal(2)
        expect(data[0]).to.equal('test rule one');
        expect(data[1]).to.equal('test rule two');
        mockDataStore.verify(x => x.readdir(TypeMoq.It.isAnyString()), TypeMoq.Times.atLeastOnce());
        mockDataStore.verify(x => x.read(TypeMoq.It.isAnyString()), TypeMoq.Times.exactly(3));

        done();
      });
    });
  });

  describe('getRule method', () => {
    let mockDataStore: TypeMoq.IMock<IDataStore>;
    let ruleService: TypeMoq.IMock<RuleService>;
    let mockElastalertManager :TypeMoq.IMock<ElastalertManager>;

    it('returns rule data', function(done) {
      mockDataStore = TypeMoq.Mock.ofType<IDataStore>();
      let ruleData = {
        rules_folder: "testFolder"
      }
      mockDataStore.setup(x => x.read(TypeMoq.It.isAnyString())).returns(() => {
        return new Promise((resolve, reject) => {
          let yamlDoc = yaml.safeDump(ruleData);
          resolve(yamlDoc);
        });
      });
      mockElastalertManager = TypeMoq.Mock.ofType<ElastalertManager>();
      
      var service = new RuleService(mockElastalertManager.object, mockDataStore.object);

      return service.getRule('test rule').then((data) => {
        expect(data).to.not.be.null
        expect(data.rules_folder).to.equal('testFolder');
        mockDataStore.verify(x => x.read(TypeMoq.It.is<string>(x => x=='/opt/elastalert/rules/test_rule.yaml')), TypeMoq.Times.atLeastOnce())
      
        done();
      });
    });
  });

  describe('saveGlobalConfig method', () => {
    let mockDataStore: TypeMoq.IMock<IDataStore>;
    let ruleService: TypeMoq.IMock<RuleService>;
    let mockElastalertManager :TypeMoq.IMock<ElastalertManager>;
    it('saves  data and restarts elastalert', function(done) {
      mockDataStore = TypeMoq.Mock.ofType<IDataStore>();
      let ruleData = {
        rules_folder: "testFolder",
        null_field: null,
        undefined_field: undefined
      }
      mockDataStore.setup(x => x.write(TypeMoq.It.isAnyString(), TypeMoq.It.isAny())).returns(() => {
        return new Promise((resolve, reject) => {
          let yamlDoc = "rules_folder: 'TestFolder'\n"
          let ruleData = yaml.safeLoad(yamlDoc);
          resolve(ruleData);
        });
      });
      mockElastalertManager = TypeMoq.Mock.ofType<ElastalertManager>();
      mockElastalertManager.setup(x => x.restart()).returns(() => {
        return new Promise((resolve, reject) => {
          resolve();
        });
      })

      var service = new RuleService(mockElastalertManager.object, mockDataStore.object);

      return service.saveRule('test rule', ruleData, null).then((data) => {
        mockDataStore.verify(x => x.write(TypeMoq.It.is<string>(x => x=='/opt/elastalert/rules/test_rule.yaml'), TypeMoq.It.isAny()), TypeMoq.Times.atLeastOnce())
        mockElastalertManager.verify(x => x.restart(), TypeMoq.Times.atLeastOnce())
        done();
      });
    });

    it('saves  data and deletes previous rule file if name changed', function(done) {
      mockDataStore = TypeMoq.Mock.ofType<IDataStore>();
      let ruleData = {
        rules_folder: "testFolder",
        null_field: null,
        undefined_field: undefined
      }
      mockDataStore.setup(x => x.write(TypeMoq.It.isAnyString(), TypeMoq.It.isAny())).returns(() => {
        return new Promise((resolve, reject) => {
          let yamlDoc = "rules_folder: 'TestFolder'\n"
          let ruleData = yaml.safeLoad(yamlDoc);
          resolve(ruleData);
        });
      });
      mockDataStore.setup(x => x.delete(TypeMoq.It.isAnyString())).returns(() => {
        return new Promise((resolve,reject) => {
          resolve();
        })
      })
      mockElastalertManager = TypeMoq.Mock.ofType<ElastalertManager>();
      mockElastalertManager.setup(x => x.restart()).returns(() => {
        return new Promise((resolve, reject) => {
          resolve();
        });
      })

      var service = new RuleService(mockElastalertManager.object, mockDataStore.object);

      return service.saveRule('test rule', ruleData, "previous rule").then((data) => {
        mockDataStore.verify(x => x.write(TypeMoq.It.is<string>(x => x=='/opt/elastalert/rules/test_rule.yaml'), TypeMoq.It.isAny()), TypeMoq.Times.atLeastOnce())
        mockDataStore.verify(x => x.delete(TypeMoq.It.is<string>(x => x=='/opt/elastalert/rules/previous_rule.yaml')), TypeMoq.Times.atLeastOnce())
        mockElastalertManager.verify(x => x.restart(), TypeMoq.Times.atLeastOnce())
        done();
      });
    });
  });
});
