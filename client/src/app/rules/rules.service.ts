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
    let ruleName: string = model.selectedRule ? model.selectedRule : model.ruleData.name;
    let path = RULE_PATH + '/' + ruleName;
    
    return this.http.post(path, request.body, request.options)
      .map(super.extractData)
      .map((res) => {
        let success = res.status === 'success';
        return success;
      })
      .catch(super.handleError);
  }

  public ruleNames(): Observable<string[]> {
    return this.http.get(RULE_PATH)
      .map(result => {
        var response: IJsendResponse = super.extractData(result)
        let ruleNames = response.data as Array<string>;
        return ruleNames;
      });
  }

  public loadRule(ruleName: string): Observable<Object> {
    return this.http.get(RULE_PATH + '/' + ruleName)
      .map(result => {
        var response: IJsendResponse = super.extractData(result)
        return response.data;
      })
  }
}
