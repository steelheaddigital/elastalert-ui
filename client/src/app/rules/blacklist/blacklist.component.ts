import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { RulesService } from '../rules.service';
import { BaseRuleComponent } from '../base-rule.component';

@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.scss']
})
export class BlacklistComponent extends BaseRuleComponent implements OnInit {

  constructor(protected builder: FormBuilder, protected rulesService: RulesService) 
  { 
    super(builder, rulesService);
  }

  ngOnInit() {
    this.buildForm();
    this.ruleForm.controls['compareKey'].setValue(this.model['ruleData']['compare_key']);
    this.ruleForm.controls['blacklist'].setValue(this.model['ruleData']['blacklist'] !== undefined ? (this.model['ruleData']['blacklist'] as string[]).join(',') : null);
    super.ngOnInit();

    this.bindControls();
  }

  private buildForm(): void {
    this.ruleForm = this.builder.group({
      commonRequiredForm: this.buildRequiredCommonForm(),
      commonOptionalForm: this.buildOptionalCommonForm(),
      compareKey: '',
      blacklist: ''
    });
  }

  private bindControls() {
    this.subscriptions.push(this.ruleForm.controls['compareKey'].valueChanges.subscribe(val => {
      this.model['ruleData']['compare_key'] = val;
    }));
    this.subscriptions.push(this.ruleForm.controls['blacklist'].valueChanges.subscribe(val => {
      this.model['ruleData']['blacklist'] = (val as string).split(',');
    }));
  }

}
