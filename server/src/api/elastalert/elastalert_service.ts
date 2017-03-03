import { BaseService } from '../common/base_service';
import { ElastalertManager} from '../common/elastalert_manager'
import * as es from 'elasticsearch';

export class ElastalertService extends BaseService {

  constructor(private elastalertManager: ElastalertManager, private esClient: Elasticsearch.Client){
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

  public status(): Promise<boolean> {
    return this.elastalertManager.status();
  }

  public alerts(limit: number): Promise<any> {
    let params = {
      size: limit,
      index: 'elastalert_status',
      type: 'elastalert'
    } as es.SearchParams

    return this.esClient.search(params) as Promise<any>;
  }
}