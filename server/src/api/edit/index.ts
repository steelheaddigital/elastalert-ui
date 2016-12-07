import * as express from 'express';
import { EditController } from './edit_controller';
import { EditService } from './edit_service';

var router = express.Router();

var editService = new EditService()
var editController = new EditController(editService);

router.get('/', editController.index);
router.post('/', editController.save);

module.exports = router;
