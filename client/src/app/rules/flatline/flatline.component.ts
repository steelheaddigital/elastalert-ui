import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { RulesService } from '../rules.service';
import { BaseRuleComponent } from '../base-rule.component';

@Component({
  selector: 'app-flatline',
  templateUrl: './flatline.component.html',
  styleUrls: ['./flatline.component.scss']
})
export class FlatlineComponent extends BaseRuleComponent implements OnInit {

  constructor(protected builder: FormBuilder, protected rulesService: RulesService) 
  { 
    super(builder, rulesService);
  }

  ngOnInit() {
    this.buildForm();
    this.ruleForm.controls['queryKey'].setValue(this.model['ruleData']['query_key']);
    this.ruleForm.controls['timeFrame'].setValue(this.model['ruleData']['timeframe'] !== undefined ? this.model['ruleData']['timeframe']['minutes'] : null);
    this.ruleForm.controls['docType'].setValue(this.model['ruleData']['doc_type']);
    this.ruleForm.controls['threshold'].setValue(this.model['ruleData']['threshold']);

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
      threshold: ['', Validators.required],
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

    this.subscriptions.push(this.ruleForm.controls['threshold'].valueChanges.subscribe(val => {
      this.model['ruleData']['threshold'] = val;
    }));
  }

}
