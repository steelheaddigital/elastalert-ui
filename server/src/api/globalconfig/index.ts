import * as express from 'express';
import { GlobalConfigController } from './globalconfig_controller';
import { GlobalConfigService } from './globalconfig_service';
import { FsDataStore } from '../common/datastore';
import { ElastalertManager } from '../common/elastalert_manager';

var router = express.Router();

var globalConfigService = new GlobalConfigService(new FsDataStore(), new ElastalertManager());
var globalConfigController = new GlobalConfigController(globalConfigService);

router.get('/', globalConfigController.index);
router.post('/', globalConfigController.save);

module.exports = router;
