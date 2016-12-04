import { Request, Response, NextFunction } from 'express';
import { GlobalConfigService } from './globalconfig_service';
let jsend = require('jsend');

export class GlobalConfigController{
  constructor(private globalConfigService: GlobalConfigService) {
  }

  /* GET Global Settings */
  public index = (req: Request, res: Response, next: NextFunction) => {
    this.globalConfigService.getGlobalConfig().then(config => {
      res.jsend.success(config);
    })
    .catch(next);
  };

  /* POST Save Global Settings */
  public save = (req: Request, res: Response, next: NextFunction) => {
    this.globalConfigService.saveGlobalConfig(req.body).then(config => {
      res.jsend.success(true);
    })
    .catch(next);
  }
}
