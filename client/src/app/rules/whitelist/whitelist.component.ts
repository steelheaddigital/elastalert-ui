import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { RulesService } from '../rules.service';
import { BaseRuleComponent } from '../base-rule.component';

@Component({
  selector: 'app-whitelist',
  templateUrl: './whitelist.component.html',
  styleUrls: ['./whitelist.component.css']
})
export class WhitelistComponent extends BaseRuleComponent implements OnInit {

  constructor(protected builder: FormBuilder, protected rulesService: RulesService) 
  { 
    super(builder, rulesService);
  }

  ngOnInit() {
    this.buildForm();
    this.ruleForm.controls['compareKey'].setValue(this.model['ruleData']['compare_key']);
    this.ruleForm.controls['whitelist'].setValue(this.model['ruleData']['whitelist'] !== undefined ? (this.model['ruleData']['whitelist'] as string[]).join(',') : null);
    this.ruleForm.controls['ignoreNull'].setValue(this.model['ruleData']['ignore_null']);
    super.ngOnInit();

    this.bindControls();
  }

  private buildForm(): void {
    this.ruleForm = this.builder.group({
      commonRequiredForm: this.buildRequiredCommonForm(),
      commonOptionalForm: this.buildOptionalCommonForm(),
      compareKey: ['', Validators.required],
      whitelist: ['', Validators.required],
      ignoreNull: false
    });
  }

  private bindControls() {
    this.subscriptions.push(this.ruleForm.controls['compareKey'].valueChanges.subscribe(val => {
      this.model['ruleData']['compare_key'] = val;
    }));
    this.subscriptions.push(this.ruleForm.controls['whitelist'].valueChanges.subscribe(val => {
      this.model['ruleData']['whitelist'] = (val as string).split(',');
    }));
    this.subscriptions.push(this.ruleForm.controls['ignoreNull'].valueChanges.subscribe(val => {
      this.model['ruleData']['ignore_null'] = val;
    }));
  }

}
