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
  public getRule = (req: Request, res: Response, next: NextFunction) => {
      let ruleName = req.params.rulename;
      this.ruleService.getRule(ruleName).then(rule => {
          res.jsend.success(rule);
      })
      .catch(next);
  }

  /* POST Update rule */
  public save = (req: Request, res: Response, next: NextFunction) => {
    let ruleName = req.params.rulename;
    this.ruleService.saveRule(ruleName, req.body).then(config => {
      res.jsend.success(true);
    })
    .catch(next);
  }

}
