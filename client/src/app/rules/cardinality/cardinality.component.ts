import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { RulesService } from '../rules.service';
import { BaseFormComponent } from '../../shared/base-form.component'

@Component({
  selector: 'app-cardinality',
  templateUrl: './cardinality.component.html',
  styleUrls: ['./cardinality.component.css'],
  providers: [RulesService]
})
export class CardinalityComponent extends BaseFormComponent implements OnInit {

  @Input()
  model: Object;

  cardinalityForm: FormGroup;

  constructor(protected builder: FormBuilder, private rulesService: RulesService) 
  { 
    super();
    this.buildForm();
  }

  ngOnInit() {
  }

  public save() {
    this.rulesService.save(this.model).subscribe(
        result => {
          this.buildForm();
        },
        error => {
          super.handleError(this.cardinalityForm, error);
        })
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
