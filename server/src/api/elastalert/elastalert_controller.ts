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

  public start = (req: Request, res: Response, next: NextFunction) => {
    let pid = this.elastalertService.start()
    res.jsend.success(pid);
  }

  public restart = (req: Request, res: Response, next: NextFunction) => {
    this.elastalertService.restart().then(pid => {
        res.jsend.success(pid);
    })
    .catch(next);
  }

}
