import * as yaml from 'js-yaml';
import * as path from 'path';
import * as _ from 'lodash';
import { BaseService } from '../common/base_service';
import { ElastalertManager} from '../common/elastalert_manager';
import { IDataStore } from '../common/datastore';
import { EventEmitter } from 'events';
let config = require('../../../config');

export class RuleService extends BaseService {
  constructor(private datastore: IDataStore, private elastalertManager: ElastalertManager){
    super();
  }

  public getRuleNames(): Promise<string[]> { 
    return this.rulesDirectory().then(rulesDirectory => {
      return this.datastore.readdir(rulesDirectory).then((files) => {
        let ruleNames: string[] = [];
        let ruleNamesPromises = _.map(files, (filePath: string) => {
          let fileName: string = path.join(rulesDirectory, filePath);
                      console.log(fileName);
          return this.datastore.read(fileName).then((data) => {
            let doc = yaml.safeLoad(data);
            let ruleName = doc !== undefined && doc['name'] != undefined ? doc['name'] : null
            if(ruleName){
              ruleNames.push(ruleName);
            }
          });
        });

        return Promise.all(ruleNamesPromises).then(() => {
          return ruleNames;
        });
      });
    })
  }

  public getRule(ruleName: string) : Promise<any> {
    return this.rulesDirectory().then(rulesDirectory => {
      ruleName = ruleName.split(" ").join("_");
      let filePath =  path.join(rulesDirectory, ruleName + '.yaml')
      return this.datastore.read(filePath).then((data) => {
        let doc = yaml.safeLoad(data);
        return doc;
      });
    });
  }

  public saveRule(ruleName: string, ruleData: Object, prevRuleName: string) : Promise<any> {
    return this.rulesDirectory().then(rulesDirectory => {
      let doc = _(ruleData).omitBy(_.isNull)
                            .omitBy(_.isUndefined)
                            .value();

      let yamlDoc = yaml.safeDump(doc);
      let fileName = ruleName.split(" ").join("_") + '.yaml'
      return this.datastore.write(path.join(rulesDirectory, fileName), yamlDoc).then(() => {
        if(prevRuleName) {
          let prevRuleFileName = prevRuleName.split(" ").join("_") + '.yaml'
          return this.datastore.delete(path.join(rulesDirectory, prevRuleFileName)).then(() => {
            return this.elastalertManager.restart();
          })
        } else {
          return this.elastalertManager.restart();
        }
      });
    });
  }
}