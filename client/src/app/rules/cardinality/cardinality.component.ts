import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-cardinality',
  templateUrl: './cardinality.component.html',
  styleUrls: ['./cardinality.component.css']
})
export class CardinalityComponent implements OnInit {

  cardinalityForm: FormGroup;

  constructor(protected builder: FormBuilder) 
  { 
    this.buildForm();
  }

  ngOnInit() {
  }

  public save() {
    let rule: Object = { }
    let commonRequiredForm = this.cardinalityForm.controls['commonRequiredForm'] as FormGroup
    rule['index'] = commonRequiredForm.controls['index'].value;
    rule['name'] = commonRequiredForm.controls['name'].value;
    rule['type'] = commonRequiredForm.controls['type'].value;

    let alerts = commonRequiredForm.controls['alerts'] as FormArray
    for( let i = 0; i < alerts.length; i++) {
      let formGroup = alerts.controls[i] as FormGroup
    }
  }

  private buildForm(): void {
    this.cardinalityForm = this.builder.group({
      commonRequiredForm: this.buildRequiredCommonForm(),
      commonOptionalForm: this.buildOptionalCommonForm()
    });
  }

  private buildOptionalCommonForm() {
    return this.builder.group({
      esHost: ''
    })
  }

  private buildRequiredCommonForm() {
    return this.builder.group({
      index: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      alerts: this.buildAlertForm() 
    })
  }

  private buildAlertForm() {
    return this.builder.array([
      this.builder.group({
        type: ['', Validators.required]
      })
    ])
  }
}
