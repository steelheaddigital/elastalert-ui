import * as express from 'express';
import { RuleController } from './rule_controller';
import { RuleService } from './rule_service';

var router = express.Router();

var ruleService = new RuleService()
var ruleController = new RuleController(ruleService);

router.get('/', ruleController.ruleNames)
router.get('/:rulename', ruleController.getRule);
router.post('/:rulename', ruleController.save)

module.exports = router;
