import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent, ValidationResult } from '../../../shared/base-form.component'

@Component({
  selector: 'rules-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent extends BaseFormComponent implements OnInit {
  
  @Input('group') 
  commonForm: FormGroup;

  constructor(private builder: FormBuilder) 
  { 
    super();
  }

  ngOnInit() {
  }


}
