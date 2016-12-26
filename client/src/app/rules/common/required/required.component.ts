import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { BaseFormComponent, ValidationResult } from '../../../shared/base-form.component'

@Component({
  selector: 'required-common',
  templateUrl: './required.component.html',
  styleUrls: ['./required.component.scss']
})
export class RequiredCommonComponent extends BaseFormComponent implements OnInit {
  
  @Input('requiredGroup') 
  requiredCommonForm: FormGroup;

  @Input()
  model: Object;

  constructor(private builder: FormBuilder) 
  { 
    super();
  }

  ngOnInit() {
    this.requiredCommonForm.controls['index'].setValue(this.model['ruleData']['index']);
    this.requiredCommonForm.controls['name'].setValue(this.model['ruleData']['name']);
    this.requiredCommonForm.controls['type'].setValue(this.model['ruleData']['type']);

    let alerts: FormArray = this.requiredCommonForm.controls['alerts'] as FormArray
    for(var i = 0; i < alerts.length; i++){
        let group: FormGroup = alerts.controls[i] as FormGroup;
        group.controls['type'].setValue(this.model['ruleData']['alert'][i]);
    }
  }
}
