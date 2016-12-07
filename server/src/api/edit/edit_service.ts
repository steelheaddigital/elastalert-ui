import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import { BaseService } from '../common/base_service';
let config = require('../../../config');

export class EditService extends BaseService {
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

  public saveGlobalConfig(configData): Promise<any> {
    return new Promise( (resolve,reject) => {
      let doc = _(configData).omitBy(_.isNull)
                             .omitBy(_.isUndefined)
                             .value();

      let yamlDoc = yaml.safeDump(doc);
      fs.writeFile(config.elastalertDir + 'config.yaml', yamlDoc, 'utf8', (err) => {
        if(err !== null) return reject(err);
        resolve();
      });
      resolve();
    });
  }

}