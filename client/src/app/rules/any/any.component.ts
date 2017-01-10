import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { RulesService } from '../rules.service';
import { BaseRuleComponent } from '../base-rule.component';

@Component({
  selector: 'app-any',
  templateUrl: './any.component.html',
  styleUrls: ['./any.component.scss']
})
export class AnyComponent extends BaseRuleComponent implements OnInit {

  constructor(protected builder: FormBuilder, protected rulesService: RulesService) 
  { 
    super(builder, rulesService);
  }

  ngOnInit() {
    this.buildForm();
    this.ruleForm.controls['queryKey'].setValue(this.model['ruleData']['query_key']);
    this.ruleForm.controls['aggregationKey'].setValue(this.model['ruleData']['aggregation_key']);
    this.ruleForm.controls['summaryTableFields'].setValue(this.model['ruleData']['summary_table_fields'] !== undefined ? (this.model['ruleData']['summary_table_fields'] as string[]).join(',') : null);
    super.ngOnInit();

    this.bindControls();
  }

  private buildForm(): void {
    this.ruleForm = this.builder.group({
      commonRequiredForm: this.buildRequiredCommonForm(),
      commonOptionalForm: this.buildOptionalCommonForm(),
      queryKey: '',
      aggregationKey: '',
      summaryTableFields: ''
    });
  }

  private bindControls() {
    this.subscriptions.push(this.ruleForm.controls['queryKey'].valueChanges.subscribe(val => {
      this.model['ruleData']['query_key'] = val;
    }));
    this.subscriptions.push(this.ruleForm.controls['aggregationKey'].valueChanges.subscribe(val => {
      this.model['ruleData']['aggregation_key'] = val;
    }));
    this.subscriptions.push(this.ruleForm.controls['summaryTableFields'].valueChanges.subscribe(val => {
      this.model['ruleData']['summary_table_fields'] = (val as string).split(',');
    }));
  }

}
