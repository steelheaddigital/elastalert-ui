import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { RULE_PATH } from '../../shared/api';
import { BaseService, IJsendResponse, JsonRequest } from '../../shared/base.service';

@Injectable()
export class EditService extends BaseService{ 
  public model = { };

  constructor (private http: Http) {
    super();
  };

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
};                      