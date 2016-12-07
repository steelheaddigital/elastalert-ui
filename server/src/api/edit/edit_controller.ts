import { Request, Response, NextFunction } from 'express';
import { EditService } from './edit_service';
let jsend = require('jsend');

export class EditController{
  constructor(private editService: EditService) {
  }

  /* GET Global Settings */
  public index = (req: Request, res: Response, next: NextFunction) => {
    this.editService.getRuleNames().then(ruleNames => {
      res.jsend.success(ruleNames);
    })
    .catch(next);
  };

  /* POST Save Global Settings */
  public save = (req: Request, res: Response, next: NextFunction) => {
    // this.globalConfigService.saveGlobalConfig(req.body).then(config => {
    //   res.jsend.success(true);
    // })
    // .catch(next);
  }
}
