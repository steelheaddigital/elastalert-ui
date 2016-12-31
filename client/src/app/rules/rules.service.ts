import { Injectable } from '@angular/core';
import { BaseService, IJsendResponse, JsonRequest } from '../shared/base.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { RULE_PATH } from '../shared/api';

@Injectable()
export class RulesService extends BaseService {

  constructor(private http: Http, private builder: FormBuilder) {
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

  public buildOptionalCommonForm() {
    return this.builder.group({
      esHost: '',
      esPort: '',
      useStrFtimeIndex: false,
      useSsl: false,
      verifyCerts: true,
      esUsername: '',
      esPassword: '',
      esUrlPrefix: '',
      esSendGetBodyAs: 'GET',
      aggregation: null,
      description: '',
      generateKibanaLink: false,
      useKibanaDashboard: '',
      kibanaUrl: '',
      useKibana4Dashboard: '',
      kibana4StartTimeDelta: 10,
      kibana4EndTimeDelta: 10,
      useLocalTime: true,
      realert: 1,
      exponentialRealert: null,
      matchEnhancements: null,
      topCountNumber: 5,
      topCountKeys: null,
      rawCountKeys: true,
      include: '*',
      maxQuerySize: null,
      queryDelay: 0,
      owner: '',
      priority: 2,
      useCountQuery: false,
      useTermsQuery: false,
      bufferTime: null,
      timestampType: 'iso',
      timestampFormat: "%Y-%m-%dT%H:%M:%SZ",
      _sourceEnabled: true
    })
  }

  public buildRequiredCommonForm() {
    return this.builder.group({
      index: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      filter: ['', Validators.required],
      alerts: this.buildAlertFormArray() 
    })
  }

  public buildAlertFormArray() {
    return this.builder.array([
      this.buildAlertForm()
    ]);
  }

  public buildAlertForm(){
    return this.builder.group({
      type: ['', Validators.required]
    })
  }

}
