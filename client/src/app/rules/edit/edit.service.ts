import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { MultistepService } from '../../shared/multistep/multistep.service';
import { EDIT_PATH } from '../../shared/api';
import { BaseService, IJsendResponse, JsonRequest } from '../../shared/base.service';

export interface IState {

  dirty: boolean,
  isValid: boolean

}

export type IStepDirection = 'backward' | 'forward';

@Injectable()
export class EditService extends MultistepService{ 

  constructor (public router: Router, private http: Http) { 
    super(router)
    this.baseRoute = '/rules/edit'
    this.steps = [
        'step1', 
        'step2'
    ]
  };

  public ruleNames(): Observable<string[]> {
    return this.http.get(EDIT_PATH)
      .map(result => {
        var response: IJsendResponse = super.extractData(result)
        let ruleNames = response.data as Array<string>;
        return ruleNames;
      });
  }

};                      