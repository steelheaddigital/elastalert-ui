import { Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { BaseFormComponent } from '../shared/base-form.component';
import { RulesService } from './rules.service';
import { Subscription } from 'rxjs/Subscription';

export class BaseRuleComponent extends BaseFormComponent implements OnInit, OnDestroy {

  protected subscriptions: Array<Subscription> = new Array<Subscription>();
  public ruleForm: FormGroup;

  @Input()
  model: Object;

  @Output()
  typeUpdated = new EventEmitter();

  constructor(protected builder: FormBuilder, protected rulesService: RulesService) 
  { 
    super();
  }

  ngOnInit() {
    this.ruleForm.controls['alerts'] = this.buildAlertFormArray();

    let alertData = this.model['ruleData']['alert'] as string[];
    if(!alertData) {
      alertData = ['email']
      this.model['ruleData']['alert'] = alertData;
    } 

    this.setupAlerts(alertData)
  }

  ngOnDestroy() {
    for(let i = 0; i < this.subscriptions.length; i++){
      this.subscriptions[i].unsubscribe();
    }
  }

  public save() {
    this.rulesService.save(this.model).subscribe(
        result => {
          alert("Rule Successfully Saved");
        },
        error => {
          super.handleError(this.ruleForm, error);
        })
  }

  public typeUpdate(type){
    this.typeUpdated.emit(type);
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
    })
  }

  public buildAlertFormArray() {
    return this.builder.array([
      this.buildAlertForm()
    ]);
  }

  public buildAlertForm(){
    return this.builder.group({
      type: ['email', Validators.required]
    })
  }

  private setupAlerts(alertData: string[]){
    if(alertData) {
      let alerts: FormArray = this.ruleForm.controls['alerts'] as FormArray
      for(let i = 0; i < alertData.length; i++){
        let group: FormGroup = alerts.controls[i] as FormGroup;
        if(!group){
          group = this.buildAlertForm();
          alerts.push(group);
        }
        group.controls['type'].setValue(alertData[i]);
        this.subscriptions.push(group.controls['type'].valueChanges.subscribe(val => {
          (this.model['ruleData']['alert'] as Array<string>)[i] = val;
        }));
      }
    }
  }
}