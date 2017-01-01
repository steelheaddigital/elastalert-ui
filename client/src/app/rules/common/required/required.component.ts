import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { BaseFormComponent, ValidationResult } from '../../../shared/base-form.component';
import { Subscription }   from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RulesService } from '../../rules.service';

@Component({
  selector: 'required-common',
  templateUrl: './required.component.html',
  styleUrls: ['./required.component.scss'],
  providers: [RulesService]
})
export class RequiredCommonComponent extends BaseFormComponent implements OnInit {
  
  @Input('requiredGroup') 
  requiredCommonForm: FormGroup;

  @Input()
  model: Object;

  @Output()
  typeUpdated = new EventEmitter();

  subscriptions: Array<Subscription> = new Array<Subscription>();

  public ruleTypes: string[] = [
    "cardinality",
    "any"
  ]

  constructor(private rulesService: RulesService, private builder: FormBuilder) 
  { 
    super();
  }

  ngOnInit() {
    this.requiredCommonForm.controls['index'].setValue(this.model['ruleData']['index']);
    this.requiredCommonForm.controls['name'].setValue(this.model['ruleData']['name']);
    this.requiredCommonForm.controls['type'].setValue(this.model['ruleData']['type'] );
    this.requiredCommonForm.controls['filter'].setValue(this.model['ruleData']['filter'] !== undefined ? this.model['ruleData']['filter'][0]['query_string']['query'] : null);

    this.bindControls();
  }

  ngOnDestroy() {
    for(let i = 0; i < this.subscriptions.length; i++){
      this.subscriptions[i].unsubscribe();
    }
  }

  private bindControls() {
    this.subscriptions.push(this.requiredCommonForm.controls['index'].valueChanges.subscribe(val => {
      this.model['ruleData']['index'] = val;
    }));
    this.subscriptions.push(this.requiredCommonForm.controls['name'].valueChanges.subscribe(val => {
      this.model['ruleData']['name'] = val;
    }));
    this.subscriptions.push(this.requiredCommonForm.controls['type'].valueChanges.subscribe(val => {
      this.model['ruleData']['type'] = val;
      this.typeUpdated.emit(val);
    }));
    this.subscriptions.push(this.requiredCommonForm.controls['filter'].valueChanges.subscribe(val => {
      if (this.model['ruleData']['filter'] === undefined) {
        this.model['ruleData']['filter'] = [{
          'query_string': { }  
        }];
      }
      this.model['ruleData']['filter'][0]['query_string']['query'] = val;
    }));
  }
}
