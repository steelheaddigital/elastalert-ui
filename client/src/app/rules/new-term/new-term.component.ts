import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { RulesService } from '../rules.service';
import { BaseRuleComponent } from '../base-rule.component';

@Component({
  selector: 'app-new-term',
  templateUrl: './new-term.component.html',
  styleUrls: ['./new-term.component.css']
})
export class NewTermComponent extends BaseRuleComponent implements OnInit {

constructor(protected builder: FormBuilder, protected rulesService: RulesService) 
  { 
    super(builder, rulesService);
  }

  ngOnInit() {
    this.buildForm();
    this.ruleForm.controls['queryKey'].setValue(this.model['ruleData']['query_key']);
    this.ruleForm.controls['docType'].setValue(this.model['ruleData']['doc_type']);
    this.ruleForm.controls['fields'].setValue(this.model['ruleData']['fields']);
    this.ruleForm.controls['termsWindowSize'].setValue(this.model['ruleData']['terms_window_size'] !== undefined ? this.model['ruleData']['terms_window_size']['minutes'] : null);
    this.ruleForm.controls['windowStepSize'].setValue(this.model['ruleData']['window_step_size'] !== undefined ? this.model['ruleData']['window_step_size']['minutes'] : null);
    this.ruleForm.controls['alertOnMissingFields'].setValue(this.model['ruleData']['alert_on_missing_fields']);

    super.ngOnInit();

    this.bindControls();
  }

  private buildForm(): void {
    this.ruleForm = this.builder.group({
      commonRequiredForm: this.buildRequiredCommonForm(),
      commonOptionalForm: this.buildOptionalCommonForm(),
      queryKey: ['', Validators.required],
      docType: '',
      fields: ['', Validators.required],
      termsWindowSize: '',
      windowStepSize: '',
      alertOnMissingFields: false
    });
  }

  private bindControls() {
    this.subscriptions.push(this.ruleForm.controls['queryKey'].valueChanges.subscribe(val => {
      this.model['ruleData']['query_key'] = val;
    }));

    this.subscriptions.push(this.ruleForm.controls['docType'].valueChanges.subscribe(val => {
      this.model['ruleData']['doc_type'] = val;
    }));

    this.subscriptions.push(this.ruleForm.controls['fields'].valueChanges.subscribe(val => {
      this.model['ruleData']['fields'] = val;
    }));

    this.subscriptions.push(this.ruleForm.controls['termsWindowSize'].valueChanges.subscribe(val => {
      if (this.model['ruleData']['terms_window_size'] === undefined) {
        this.model['ruleData']['terms_window_size'] = { };
      }
      this.model['ruleData']['terms_window_size']['minutes'] = val;
    }));

    this.subscriptions.push(this.ruleForm.controls['windowStepSize'].valueChanges.subscribe(val => {
      if (this.model['ruleData']['window_step_size'] === undefined) {
        this.model['ruleData']['window_step_size'] = { };
      }
      this.model['ruleData']['window_step_size']['minutes'] = val;
    }));

    this.subscriptions.push(this.ruleForm.controls['alertOnMissingFields'].valueChanges.subscribe(val => {
      this.model['ruleData']['alert_on_missing_fields'] = val;
    }));
  }

}
