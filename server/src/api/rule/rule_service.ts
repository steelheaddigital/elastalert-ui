import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import { BaseService } from '../common/base_service';
import { ElastalertManager} from '../common/elastalert_manager';
let config = require('../../../config');

export class RuleService extends BaseService {
  constructor(private elastalertManager: ElastalertManager){
    super();
  }

  public getRuleNames(): Promise<any> { 
    return this.rulesDirectory().then(rulesDirectory => {
      return new Promise( (resolve,reject) => {
        fs.readdir(rulesDirectory, (err,files) => {
          if(err !== null) return reject(err);

          let ruleNames = _.map(files, (filePath: string) => {
            let fileName: string = path.basename(filePath)
            let ruleName: string =  fileName.substr(0, fileName.lastIndexOf('.'));
            return ruleName;
          });

          resolve(ruleNames);
        })
      })
    });
  }

  public getRule(ruleName: string) : Promise<any> {
    return this.rulesDirectory().then(rulesDirectory => {
      return new Promise( (resolve,reject) => {
          let filePath =  path.join(rulesDirectory, ruleName + '.yaml')
          fs.readFile(filePath, 'utf8', (err,data) => {
              if(err !== null) return reject(err);
              let doc = yaml.safeLoad(data);
              resolve(doc);
          });
      });
    });
  }

  public saveRule(ruleName: string, ruleData: Object) : Promise<any> {
    return this.rulesDirectory().then(rulesDirectory => {
      return new Promise( (resolve,reject) => {
        let doc = _(ruleData).omitBy(_.isNull)
                              .omitBy(_.isUndefined)
                              .value();

        let yamlDoc = yaml.safeDump(doc);
        let fileName = ruleName + '.yaml'
        fs.writeFile(path.join(rulesDirectory, fileName), yamlDoc, 'utf8', (err) => {
          if(err !== null) return reject(err);
          return this.elastalertManager.restart().then(() => {
            resolve();
          });
        });
      });
    });
  }
}