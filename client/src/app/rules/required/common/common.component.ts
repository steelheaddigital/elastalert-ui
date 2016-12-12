import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { BaseFormComponent, ValidationResult } from '../../../shared/base-form.component'

@Component({
  selector: 'rules-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent extends BaseFormComponent implements OnInit {
  
  @Input('group') 
  commonForm: FormGroup;

  @Input()
  model: Object;

  constructor(private builder: FormBuilder) 
  { 
    super();
  }

  ngOnInit() {
    this.commonForm.controls['index'].setValue(this.model['ruleData']['index']);
    this.commonForm.controls['name'].setValue(this.model['ruleData']['name']);
    this.commonForm.controls['type'].setValue(this.model['ruleData']['type']);

    let alerts: FormArray = this.commonForm.controls['alerts'] as FormArray
    for(var i = 0; i < alerts.length; i++){
        let group: FormGroup = alerts.controls[i] as FormGroup;
        group.controls['type'].setValue(this.model['ruleData']['alert'][i]);
    }
  }
}
