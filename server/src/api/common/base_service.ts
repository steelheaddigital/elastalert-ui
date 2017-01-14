import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
let config = require('../../../config');

export class BaseService {
  protected configPath: string;

  constructor(){
    this.configPath = this.getConfigPath();
  }

  public rulesDirectory(): Promise<any> {
    return new Promise( (resolve,reject) => {
      let configPath: string = this.configPath;
      fs.readFile(configPath, 'utf8', (err,data) => {
        if(err !== null) return reject(err);
        let doc = yaml.safeLoad(data);
        let rulesDirectory = doc.rules_folder;
        resolve(path.join(config.elastalertDir,rulesDirectory));
      });
    });
  }

  public getConfigPath(): string {
    let configPath: string = path.join(config.elastalertDir, 'config.yaml');
    if(!fs.existsSync(configPath)){
      configPath = path.join(config.elastalertDir + 'config.yaml.example');
    }

    return configPath
  }

}