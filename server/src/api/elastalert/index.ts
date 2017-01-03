import * as express from 'express';
import { ElastalertController } from './elastalert_controller';
import { ElastalertService } from './elastalert_service';
import { ElastalertManager } from '../../elastalert/elastalert_manager';

let router = express.Router();

let elastalertManager = new ElastalertManager();
let elastalertService = new ElastalertService(elastalertManager)
let elastalertController = new ElastalertController(elastalertService);

router.post('/start', elastalertController.start);
router.post('/stop', elastalertController.stop);
router.post('/restart', elastalertController.restart);

module.exports = router;
