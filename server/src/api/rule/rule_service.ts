import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import { BaseService } from '../common/base_service';
let config = require('../../../config');

export class RuleService extends BaseService {
  constructor(){
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

  public rule(ruleName: string) : Promise<any> {
      return this.rulesDirectory().then(rulesDirectory => {
        return new Promise( (resolve,reject) => {
            let filePath =  path.join(rulesDirectory, ruleName + '.yaml')
            fs.readFile(filePath, 'utf8', (err,data) => {
                if(err !== null) return reject(err);
                let doc = yaml.safeLoad(data);
                resolve(doc);
            });
        });
      })
  }
}