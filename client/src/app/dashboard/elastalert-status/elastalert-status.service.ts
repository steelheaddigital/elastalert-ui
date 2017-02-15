import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ELASTALERT_PATH } from '../../shared/api';
import { BaseService, IJsendResponse } from '../../shared/base.service' 
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ElastalertStatusService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  public status(): Observable<boolean> {
    let path = ELASTALERT_PATH + '/status';
    
    return this.http.get(path, null)
      .map(super.extractData)
      .map((res) => {
        let status = res.data as boolean;
        return status;
      })
      .catch(super.handleError);
  }

}
