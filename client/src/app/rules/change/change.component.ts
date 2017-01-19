import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { RulesService } from '../rules.service';
import { BaseRuleComponent } from '../base-rule.component';


@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent extends BaseRuleComponent implements OnInit {

  constructor(protected builder: FormBuilder, protected rulesService: RulesService) 
  { 
    super(builder, rulesService);
  }

  ngOnInit() {
    this.buildForm();
    this.ruleForm.controls['compareKey'].setValue(this.model['ruleData']['compare_key']);
    this.ruleForm.controls['ignoreNull'].setValue(this.model['ruleData']['ignore_null']);
    this.ruleForm.controls['queryKey'].setValue(this.model['ruleData']['query_key']);
    this.ruleForm.controls['timeFrame'].setValue(this.model['ruleData']['timeframe'] !== undefined ? this.model['ruleData']['timeframe']['minutes'] : null);

    super.ngOnInit();

    this.bindControls();
  }

  private buildForm(): void {
    this.ruleForm = this.builder.group({
      commonRequiredForm: this.buildRequiredCommonForm(),
      commonOptionalForm: this.buildOptionalCommonForm(),
      compareKey: ['', Validators.required],
      ignoreNull: false,
      queryKey: ['', Validators.required],
      timeFrame: ''
    });
  }

  private bindControls() {
    this.subscriptions.push(this.ruleForm.controls['compareKey'].valueChanges.subscribe(val => {
      this.model['ruleData']['compare_key'] = val;
    }));

    this.subscriptions.push(this.ruleForm.controls['ignoreNull'].valueChanges.subscribe(val => {
      this.model['ruleData']['ignore_null'] = val;
    }));

    this.subscriptions.push(this.ruleForm.controls['queryKey'].valueChanges.subscribe(val => {
      this.model['ruleData']['query_key'] = val;
    }));

    this.subscriptions.push(this.ruleForm.controls['timeFrame'].valueChanges.subscribe(val => {
      if (this.model['ruleData']['timeframe'] === undefined) {
        this.model['ruleData']['timeframe'] = { };
      }
      this.model['ruleData']['timeframe']['minutes'] = val;
    }));
  }

}
