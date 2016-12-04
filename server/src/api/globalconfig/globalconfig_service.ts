import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as _ from 'lodash';
let config = require('../../../config');

export class GlobalConfigService {
  constructor(){
  }

  public getGlobalConfig(): Promise<any> {
    return new Promise( (resolve,reject) => {
      let configPath: string = config.elastalertDir + 'config.yaml';
      if(!fs.existsSync(configPath)){
        configPath = config.elastalertDir + 'config.yaml.example';
      }
      
      fs.readFile(configPath, 'utf8', (err,data) => {
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
      fs.writeFile(config.elastalertDir + 'config.yaml', yamlDoc, 'utf8', (err) => {
        if(err !== null) return reject(err);
        resolve();
      });
      resolve();
    });
  }

}