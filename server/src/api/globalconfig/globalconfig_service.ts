import * as yaml from 'js-yaml';
import * as path from 'path'
import * as _ from 'lodash';
import { BaseService } from '../common/base_service';
import { IDataStore } from '../common/datastore';
import { ElastalertManager} from '../common/elastalert_manager';
import { } from '../elastalert/'
let config = require('../../../config');

export class GlobalConfigService extends BaseService {
  constructor(private ds: IDataStore, private elastalertManager: ElastalertManager){
    super();
  }

  public getGlobalConfig(): Promise<any> {
    return this.ds.read(this.configPath).then((data) => {
      let doc = yaml.safeLoad(data);
      return doc;
    })
  }

  public saveGlobalConfig(configData): Promise<any> {
    let fileName: string = path.join(config.elastalertDir,'config.yaml');
    let doc = _(configData).omitBy(_.isNull)
                            .omitBy(_.isUndefined)
                            .value();

    let yamlDoc = yaml.safeDump(doc);
    return this.ds.write(fileName, yamlDoc).then(() => {
      return this.elastalertManager.restart();
    })
  }
}