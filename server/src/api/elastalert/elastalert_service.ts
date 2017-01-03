import { BaseService } from '../common/base_service';
import { ElastalertManager} from '../../elastalert/elastalert_manager'
let config = require('../../../config');

export class ElastalertService extends BaseService {
  constructor(private elastalertManager: ElastalertManager){
    super();
  }

  public start(): number {
    return this.elastalertManager.start()
  }

  public stop(): Promise<number> {
    return this.elastalertManager.stop();
  }

  public restart(): Promise<number> {
    return this.elastalertManager.restart();
  }
}