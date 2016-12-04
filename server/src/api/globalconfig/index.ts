import * as express from 'express';
import { GlobalConfigController } from './globalconfig_controller';
import { GlobalConfigService } from './globalconfig_service';

var router = express.Router();

var globalConfigService = new GlobalConfigService()
var globalConfigController = new GlobalConfigController(globalConfigService);

router.get('/', globalConfigController.index);
router.post('/', globalConfigController.save);

module.exports = router;
