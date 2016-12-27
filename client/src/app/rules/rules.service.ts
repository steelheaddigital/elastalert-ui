import { Injectable } from '@angular/core';
import { BaseService, IJsendResponse, JsonRequest } from '../shared/base.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { RULE_PATH } from '../shared/api';

@Injectable()
export class RulesService extends BaseService {

  constructor(private http: Http) {
    super();
   }

  public save(model): Observable<boolean> {
    let request = super.BuildJsonRequest(model.ruleData);
    let path = RULE_PATH + '/' + model.selectedRule;
    return this.http.put(path, request.body, request.options)
      .map(super.extractData)
      .map((res) => {
        let success = res.status === 'success';
        return success;
      })
      .catch(super.handleError);
  }

}
