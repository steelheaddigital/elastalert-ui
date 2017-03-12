import { Request, Response, NextFunction } from 'express';
import { ElastalertService } from './elastalert_service';
let jsend = require('jsend');

export class ElastalertController{
  constructor(private elastalertService: ElastalertService) {
  }

  /* POST Save new rule */
  public stop = (req: Request, res: Response, next: NextFunction) => {
    this.elastalertService.stop().then(pid => {
        res.jsend.success(pid);
    })
    .catch(next);
  }

  /* POST Start elastalert */
  public start = (req: Request, res: Response, next: NextFunction) => {
    let pid = this.elastalertService.start()
    res.jsend.success(pid);
  }

  /* POST Re-start elastalert */
  public restart = (req: Request, res: Response, next: NextFunction) => {
    this.elastalertService.restart().then(pid => {
        res.jsend.success(pid);
    })
    .catch(next);
  }

  /* GET elastalert status */
  public status = (req: Request, res: Response, next: NextFunction) => {
    this.elastalertService.status().then(status => {
        res.jsend.success(status);
    })
    .catch(next);
  }

  /* GET last n elastalerts */
  public alerts = (req: Request, res: Response, next: NextFunction) => {
    let limit = req.query.limit === null ? 10 : req.query.limit;
    this.elastalertService.alerts(limit).then(alerts => {
        res.jsend.success(alerts);
    })
    .catch(next);
  }

}
