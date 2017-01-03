import * as express from 'express';
import { RuleController } from './rule_controller';
import { RuleService } from './rule_service';
import { ElastalertManager} from '../../elastalert/elastalert_manager';

var router = express.Router();

var elastalertManager = new ElastalertManager();
var ruleService = new RuleService(elastalertManager);
var ruleController = new RuleController(ruleService);

router.get('/', ruleController.ruleNames)
router.get('/:rulename', ruleController.getRule);
router.post('/:rulename', ruleController.save)

module.exports = router;
