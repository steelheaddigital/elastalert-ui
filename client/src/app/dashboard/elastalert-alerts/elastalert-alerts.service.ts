import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ELASTALERT_PATH } from '../../shared/api';
import { BaseService, IJsendResponse } from '../../shared/base.service' 
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ElastalertAlertsService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  public getAlerts(): Observable<Object>{
    let path = ELASTALERT_PATH + '/alerts';

    return this.http.get(path)
      .map(super.extractData)
      .map((response) => {
        return response.data;
      })
      .catch(super.handleError);
  }

}
