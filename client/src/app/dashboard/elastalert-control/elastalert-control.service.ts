import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ELASTALERT_PATH } from '../../shared/api';
import { BaseService, IJsendResponse } from '../../shared/base.service' 
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ElastalertControlService extends BaseService {

  constructor(private http: Http) {
    super();
   }

  public restart(): Observable<number> {
    let path = ELASTALERT_PATH + '/restart';
    
    return this.http.post(path, null)
      .map(super.extractData)
      .map((res) => {
        let pid = res.data as number;
        return pid;
      })
      .catch(super.handleError);
  }

  public stop(): Observable<number> {
    let path = ELASTALERT_PATH + '/stop';
    
    return this.http.post(path, null)
      .map(super.extractData)
      .map((res) => {
        let pid = res.data as number;
        return pid;
      })
      .catch(super.handleError);
  }

  public start(): Observable<number> {
    let path = ELASTALERT_PATH + '/start';
    
    return this.http.post(path, null)
      .map(super.extractData)
      .map((res) => {
        let pid = res.data as number;
        return pid;
      })
      .catch(super.handleError);
  }
}
