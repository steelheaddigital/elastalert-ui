import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { RulesService } from '../rules.service';
import { BaseRuleComponent } from '../base-rule.component';

@Component({
  selector: 'app-spike',
  templateUrl: './spike.component.html',
  styleUrls: ['./spike.component.scss']
})
export class SpikeComponent extends BaseRuleComponent implements OnInit {

  public spikeTypes: string[] = [
    "up",
    "down",
    "both"
  ]

  constructor(protected builder: FormBuilder, protected rulesService: RulesService) 
  { 
    super(builder, rulesService);
  }

  ngOnInit() {
    this.buildForm();
    this.ruleForm.controls['queryKey'].setValue(this.model['ruleData']['query_key']);
    this.ruleForm.controls['timeFrame'].setValue(this.model['ruleData']['timeframe'] !== undefined ? this.model['ruleData']['timeframe']['minutes'] : null);
    this.ruleForm.controls['docType'].setValue(this.model['ruleData']['doc_type']);
    this.ruleForm.controls['termsSize'].setValue(this.model['ruleData']['terms_size']);
    this.ruleForm.controls['spikeHeight'].setValue(this.model['ruleData']['spike_height']);
    this.ruleForm.controls['spikeType'].setValue(this.model['ruleData']['spike_type']);
    this.ruleForm.controls['alertOnNewData'].setValue(this.model['ruleData']['alert_on_new_data']);
    this.ruleForm.controls['thresholdRef'].setValue(this.model['ruleData']['threshold_ref']);
    this.ruleForm.controls['thresholdCur'].setValue(this.model['ruleData']['threshold_cur']);

    super.ngOnInit();

    this.bindControls();
  }

  private buildForm(): void {
    this.ruleForm = this.builder.group({
      commonRequiredForm: this.buildRequiredCommonForm(),
      commonOptionalForm: this.buildOptionalCommonForm(),
      queryKey: '',
      timeFrame: ['', Validators.required],
      docType: '',
      termsSize: '',
      spikeHeight: ['', Validators.required],
      spikeType: ['up', Validators.required],
      alertOnNewData: false,
      thresholdRef: '',
      thresholdCur: ''
    });
  }

  private bindControls() {
    this.subscriptions.push(this.ruleForm.controls['queryKey'].valueChanges.subscribe(val => {
      this.model['ruleData']['query_key'] = val;
    }));

    this.subscriptions.push(this.ruleForm.controls['timeFrame'].valueChanges.subscribe(val => {
      if (this.model['ruleData']['timeframe'] === undefined) {
        this.model['ruleData']['timeframe'] = { };
      }
      this.model['ruleData']['timeframe']['minutes'] = val;
    }));

    this.subscriptions.push(this.ruleForm.controls['docType'].valueChanges.subscribe(val => {
      this.model['ruleData']['doc_type'] = val;
    }));

    this.subscriptions.push(this.ruleForm.controls['termsSize'].valueChanges.subscribe(val => {
      this.model['ruleData']['terms_size'] = val;
    }));


    this.subscriptions.push(this.ruleForm.controls['spikeHeight'].valueChanges.subscribe(val => {
      this.model['ruleData']['spike_height'] = val;
    }));

    this.subscriptions.push(this.ruleForm.controls['spikeType'].valueChanges.subscribe(val => {
      this.model['ruleData']['spike_type'] = val;
    }));

    this.subscriptions.push(this.ruleForm.controls['alertOnNewData'].valueChanges.subscribe(val => {
      this.model['ruleData']['alert_on_new_data'] = val;
    }));

    this.subscriptions.push(this.ruleForm.controls['thresholdRef'].valueChanges.subscribe(val => {
      this.model['ruleData']['threshold_ref'] = val;
    }));

    this.subscriptions.push(this.ruleForm.controls['thresholdCur'].valueChanges.subscribe(val => {
      this.model['ruleData']['threshold_cur'] = val;
    }));
  }
}
