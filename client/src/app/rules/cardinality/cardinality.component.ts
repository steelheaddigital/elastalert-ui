import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { RulesService } from '../rules.service';
import { BaseFormComponent } from '../../shared/base-form.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-cardinality',
  templateUrl: './cardinality.component.html',
  styleUrls: ['./cardinality.component.css'],
  providers: [RulesService]
})
export class CardinalityComponent extends BaseFormComponent implements OnInit {

  @Input()
  model: Object;

  @Output()
  typeUpdated = new EventEmitter();

  cardinalityForm: FormGroup;
  subscriptions: Array<Subscription> = new Array<Subscription>();


  constructor(protected builder: FormBuilder, private rulesService: RulesService) 
  { 
    super();
  }

  ngOnInit() {
    this.buildForm();
    this.cardinalityForm.controls['timeFrame'].setValue(this.model['ruleData']['timeframe'] !== undefined ? this.model['ruleData']['timeframe']['minutes'] : null);
    this.cardinalityForm.controls['cardinalityField'].setValue(this.model['ruleData']['cardinality_field']);
    this.cardinalityForm.controls['queryKey'].setValue(this.model['ruleData']['query_key']);
    this.cardinalityForm.controls['maxCardinality'].setValue(this.model['ruleData']['max_cardinality']);
    this.cardinalityForm.controls['minCardinality'].setValue(this.model['ruleData']['min_cardinality']);
  }

  ngOnDestroy() {
    for(let i = 0; i < this.subscriptions.length; i++){
      this.subscriptions[i].unsubscribe();
    }
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

  public typeUpdate(type){
    this.typeUpdated.emit(type);
  }

  private buildForm(): void {
    this.cardinalityForm = this.builder.group({
      commonRequiredForm: this.rulesService.buildRequiredCommonForm(),
      timeFrame: ['', Validators.required],
      cardinalityField: ['', Validators.required],
      commonOptionalForm: this.rulesService.buildOptionalCommonForm(),
      queryKey: '',
      maxCardinality: '',
      minCardinality: ''
    });
  }

  private bindControls() {
    this.subscriptions.push(this.cardinalityForm.controls['timeFrame'].valueChanges.subscribe(val => {
      if (this.model['ruleData']['time_frame'] === undefined) {
        this.model['ruleData']['time_frame'] = { };
      }
      this.model['ruleData']['time_frame']['minutes'] = val;
    }));
    this.subscriptions.push(this.cardinalityForm.controls['cardinalityField'].valueChanges.subscribe(val => {
      this.model['ruleData']['cardinality_field'] = val;
    }));
    this.subscriptions.push(this.cardinalityForm.controls['queryKey'].valueChanges.subscribe(val => {
      this.model['ruleData']['query_key'] = val;
    }));
    this.subscriptions.push(this.cardinalityForm.controls['maxCardinality'].valueChanges.subscribe(val => {
      this.model['ruleData']['max_cardinality'] = val;
    }));
    this.subscriptions.push(this.cardinalityForm.controls['minCardinality'].valueChanges.subscribe(val => {
      this.model['ruleData']['min_cardinality'] = val;
    }));
  }

}
