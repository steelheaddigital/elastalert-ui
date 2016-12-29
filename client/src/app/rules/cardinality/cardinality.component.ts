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
  }

  ngOnInit() {
    this.buildForm();
  }

  public save() {
    this.rulesService.save(this.model).subscribe(
        result => {
          alert("Rule Successfully Saved");
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
      esHost: '',
      esPort: '',
      useStrFtimeIndex: false,
      useSsl: false,
      verifyCerts: true,
      esUsername: '',
      esPassword: '',
      esUrlPrefix: '',
      esSendGetBodyAs: 'GET',
      aggregation: null,
      description: '',
      generateKibanaLink: false,
      useKibanaDashboard: '',
      kibanaUrl: '',
      useKibana4Dashboard: '',
      kibana4StartTimeDelta: 10,
      kibana4EndTimeDelta: 10,
      useLocalTime: true,
      realert: 1,
      exponentialRealert: null,
      matchEnhancements: null,
      topCountNumber: 5,
      topCountKeys: null,
      rawCountKeys: true,
      include: '*',
      maxQuerySize: null,
      queryDelay: 0,
      owner: '',
      priority: 2,
      useCountQuery: false,
      useTermsQuery: false,
      bufferTime: null,
      timestampType: 'iso',
      timestampFormat: "%Y-%m-%dT%H:%M:%SZ",
      _sourceEnabled: true
    })
  }

  private buildRequiredCommonForm() {
    return this.builder.group({
      index: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      filter: ['', Validators.required],
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
