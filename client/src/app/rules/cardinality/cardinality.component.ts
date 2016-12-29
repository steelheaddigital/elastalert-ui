import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { RulesService } from '../rules.service';
import { BaseFormComponent } from '../../shared/base-form.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-cardinality',
  templateUrl: './cardinality.component.html',
  styleUrls: ['./cardinality.component.css'],
  providers: [RulesService]
})
export class CardinalityComponent extends BaseFormComponent implements OnInit {

  @Input()
  model: Object;

  cardinalityForm: FormGroup;
  subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(protected builder: FormBuilder, private rulesService: RulesService) 
  { 
    super();
  }

  ngOnInit() {
    this.buildForm();
    this.cardinalityForm.controls['timeFrame'].setValue(this.model['ruleData']['timeframe'] !== undefined ? this.model['ruleData']['timeframe']['minutes'] : null);
    this.cardinalityForm.controls['cardinalityField'].setValue(this.model['ruleData']['cardinality_field']);
    this.cardinalityForm.controls['queryKey'].setValue(this.model['ruleData']['query_key']);
    this.cardinalityForm.controls['maxCardinality'].setValue(this.model['ruleData']['max_cardinality']);
    this.cardinalityForm.controls['minCardinality'].setValue(this.model['ruleData']['min_cardinality']);
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
          super.handleError(this.cardinalityForm, error);
        })
  }

  private buildForm(): void {
    this.cardinalityForm = this.builder.group({
      timeFrame: ['', Validators.required],
      cardinalityField: ['', Validators.required],
      commonRequiredForm: this.buildRequiredCommonForm(),
      queryKey: '',
      maxCardinality: '',
      minCardinality: '',
      commonOptionalForm: this.buildOptionalCommonForm()
    });
  }

  private bindControls() {
    this.subscriptions.push(this.cardinalityForm.controls['timeFrame'].valueChanges.subscribe(val => {
      if (this.model['ruleData']['time_frame'] === undefined) {
        this.model['ruleData']['time_frame'] = { };
      }
      this.model['ruleData']['time_frame']['minutes'] = val;
    }));
    this.subscriptions.push(this.cardinalityForm.controls['cardinalityField'].valueChanges.subscribe(val => {
      this.model['ruleData']['cardinality_field'] = val;
    }));
    this.subscriptions.push(this.cardinalityForm.controls['queryKey'].valueChanges.subscribe(val => {
      this.model['ruleData']['query_key'] = val;
    }));
    this.subscriptions.push(this.cardinalityForm.controls['maxCardinality'].valueChanges.subscribe(val => {
      this.model['ruleData']['max_cardinality'] = val;
    }));
    this.subscriptions.push(this.cardinalityForm.controls['minCardinality'].valueChanges.subscribe(val => {
      this.model['ruleData']['min_cardinality'] = val;
    }));
  }

  private buildOptionalCommonForm() {
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

  private buildRequiredCommonForm() {
    return this.builder.group({
      index: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      filter: ['', Validators.required],
      alerts: this.buildAlertForm() 
    })
  }

  private buildAlertForm() {
    return this.builder.array([
      this.builder.group({
        type: ['', Validators.required]
      })
    ])
  }
}
