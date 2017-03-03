import * as express from 'express';
import { ElastalertController } from './elastalert_controller';
import { ElastalertService } from './elastalert_service';
import { ElastalertManager } from '../common/elastalert_manager';
import { GlobalConfigService } from '../globalconfig/globalconfig_service';
import { FsDataStore } from '../common/datastore';
import * as es from 'elasticsearch';
let config = require('../../../config');

let router = express.Router();

let elastalertManager = new ElastalertManager();
let globalConfigService = new GlobalConfigService(new FsDataStore(), elastalertManager);

globalConfigService.getGlobalConfig().then(conf => {
  let esHost = conf.es_host;
  let esPort = conf.es_port
  let esClient = new es.Client({
    host: esHost + ':' + esPort,
    log: 'trace'
  });

  let elastalertService = new ElastalertService(elastalertManager, esClient);
  let elastalertController = new ElastalertController(elastalertService);

  router.post('/start', elastalertController.start);
  router.post('/stop', elastalertController.stop);
  router.post('/restart', elastalertController.restart);
  router.get('/status', elastalertController.status);
  router.get('/alerts', elastalertController.alerts);
});

module.exports = router;
