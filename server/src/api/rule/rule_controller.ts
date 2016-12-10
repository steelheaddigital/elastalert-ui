import { Request, Response, NextFunction } from 'express';
import { RuleService } from './rule_service';
let jsend = require('jsend');

export class RuleController{
  constructor(private ruleService: RuleService) {
  }

  /* GET all rules names */
  public ruleNames = (req: Request, res: Response, next: NextFunction) => {
    this.ruleService.getRuleNames().then(ruleNames => {
      res.jsend.success(ruleNames);
    })
    .catch(next);
  };

  /* GET rules */
  public rule = (req: Request, res: Response, next: NextFunction) => {
      let ruleName = req.params.rulename;
      this.ruleService.rule(ruleName).then(rule => {
          res.jsend.success(rule);
      })
      .catch(next);
  }

  /* POST Save Global Settings */
  public save = (req: Request, res: Response, next: NextFunction) => {
    // this.globalConfigService.saveGlobalConfig(req.body).then(config => {
    //   res.jsend.success(true);
    // })
    // .catch(next);
  }


}
