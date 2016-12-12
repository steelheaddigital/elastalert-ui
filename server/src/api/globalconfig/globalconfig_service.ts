import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path'
import * as _ from 'lodash';
import { BaseService } from '../common/base_service';
let config = require('../../../config');

export class GlobalConfigService extends BaseService {
  constructor(){
    super();
  }

  public getGlobalConfig(): Promise<any> {
    return new Promise( (resolve,reject) => {
      fs.readFile(this.configPath, 'utf8', (err,data) => {
        if(err !== null) return reject(err);
        let doc = yaml.safeLoad(data);
        resolve(doc);
      });
    });
  }

  public saveGlobalConfig(configData): Promise<any> {
    return new Promise( (resolve,reject) => {
      let doc = _(configData).omitBy(_.isNull)
                             .omitBy(_.isUndefined)
                             .value();

      let yamlDoc = yaml.safeDump(doc);
      fs.writeFile(path.join(config.elastalertDir,'config.yaml'), yamlDoc, 'utf8', (err) => {
        if(err !== null) return reject(err);
        resolve();
      });
      resolve();
    });
  }

}