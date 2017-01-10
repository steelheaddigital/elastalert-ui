import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { RulesService } from '../rules.service';
import { BaseRuleComponent } from '../base-rule.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-cardinality',
  templateUrl: './cardinality.component.html',
  styleUrls: ['./cardinality.component.css']
})
export class CardinalityComponent extends BaseRuleComponent implements OnInit {

  constructor(protected builder: FormBuilder, protected rulesService: RulesService) 
  { 
    super(builder, rulesService);
  }

  ngOnInit() {
    this.buildForm();
    if(this.model['ruleData']){
      this.ruleForm.controls['timeFrame'].setValue(this.model['ruleData']['timeframe'] !== undefined ? this.model['ruleData']['timeframe']['minutes'] : null);
      this.ruleForm.controls['cardinalityField'].setValue(this.model['ruleData']['cardinality_field']);
      this.ruleForm.controls['queryKey'].setValue(this.model['ruleData']['query_key']);
      this.ruleForm.controls['maxCardinality'].setValue(this.model['ruleData']['max_cardinality']);
      this.ruleForm.controls['minCardinality'].setValue(this.model['ruleData']['min_cardinality']);
      super.ngOnInit();

      this.bindControls();
    }
  }

  private buildForm(): void {
    this.ruleForm = this.builder.group({
      commonRequiredForm: this.buildRequiredCommonForm(),
      timeFrame: ['', Validators.required],
      cardinalityField: ['', Validators.required],
      commonOptionalForm: this.buildOptionalCommonForm(),
      queryKey: '',
      maxCardinality: '',
      minCardinality: ''
    });
  }

  private bindControls() {
    this.subscriptions.push(this.ruleForm.controls['timeFrame'].valueChanges.subscribe(val => {
      if (this.model['ruleData']['timerame'] === undefined) {
        this.model['ruleData']['timeframe'] = { };
      }
      this.model['ruleData']['timeframe']['minutes'] = val;
    }));
    this.subscriptions.push(this.ruleForm.controls['cardinalityField'].valueChanges.subscribe(val => {
      this.model['ruleData']['cardinality_field'] = val;
    }));
    this.subscriptions.push(this.ruleForm.controls['queryKey'].valueChanges.subscribe(val => {
      this.model['ruleData']['query_key'] = val;
    }));
    this.subscriptions.push(this.ruleForm.controls['maxCardinality'].valueChanges.subscribe(val => {
      this.model['ruleData']['max_cardinality'] = val;
    }));
    this.subscriptions.push(this.ruleForm.controls['minCardinality'].valueChanges.subscribe(val => {
      this.model['ruleData']['min_cardinality'] = val;
    }));
  }

}
