import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { RulesService } from '../rules.service';
import { BaseRuleComponent } from '../base-rule.component';

@Component({
  selector: 'app-frequency',
  templateUrl: './frequency.component.html',
  styleUrls: ['./frequency.component.scss']
})
export class FrequencyComponent extends BaseRuleComponent implements OnInit {

  constructor(protected builder: FormBuilder, protected rulesService: RulesService) 
  { 
    super(builder, rulesService);
  }

  ngOnInit() {
    this.buildForm();
    this.ruleForm.controls['queryKey'].setValue(this.model['ruleData']['query_key']);
    this.ruleForm.controls['timeFrame'].setValue(this.model['ruleData']['timeframe'] !== undefined ? this.model['ruleData']['timeframe']['minutes'] : null);
    this.ruleForm.controls['numEvents'].setValue(this.model['ruleData']['num_events']);
    this.ruleForm.controls['attachRelated'].setValue(this.model['ruleData']['attach_related']);
    this.ruleForm.controls['docType'].setValue(this.model['ruleData']['doc_type']);
    this.ruleForm.controls['termsSize'].setValue(this.model['ruleData']['terms_size']);

    super.ngOnInit();

    this.bindControls();
  }

  private buildForm(): void {
    this.ruleForm = this.builder.group({
      commonRequiredForm: this.buildRequiredCommonForm(),
      commonOptionalForm: this.buildOptionalCommonForm(),
      queryKey: '',
      numEvents: ['', Validators.required],
      timeFrame: ['', Validators.required],
      attachRelated: false,
      docType: '',
      termsSize: ''
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

    this.subscriptions.push(this.ruleForm.controls['numEvents'].valueChanges.subscribe(val => {
      this.model['ruleData']['num_events'] = val;
    }));

    this.subscriptions.push(this.ruleForm.controls['attachRelated'].valueChanges.subscribe(val => {
      this.model['ruleData']['attach_related'] = val;
    }));

    this.subscriptions.push(this.ruleForm.controls['docType'].valueChanges.subscribe(val => {
      this.model['ruleData']['doc_type'] = val;
    }));

    this.subscriptions.push(this.ruleForm.controls['termsSize'].valueChanges.subscribe(val => {
      this.model['ruleData']['terms_size'] = val;
    }));
  }
}
