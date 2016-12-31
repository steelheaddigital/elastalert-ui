import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { RulesService } from '../rules.service';
import { BaseFormComponent } from '../../shared/base-form.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-any',
  templateUrl: './any.component.html',
  styleUrls: ['./any.component.scss'],
  providers: [RulesService]
})
export class AnyComponent extends BaseFormComponent implements OnInit {

  @Input()
  model: Object;

  @Output()
  typeUpdated = new EventEmitter();

  anyForm: FormGroup;
  subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(protected builder: FormBuilder, private rulesService: RulesService) 
  { 
    super();
  }

  ngOnInit() {
    this.buildForm();
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
          super.handleError(this.anyForm, error);
        })
  }

  public typeUpdate(type){
    this.typeUpdated.emit(type);
  }

  private buildForm(): void {
    this.anyForm = this.builder.group({
      commonRequiredForm: this.rulesService.buildRequiredCommonForm(),
      commonOptionalForm: this.rulesService.buildOptionalCommonForm(),
      queryKey: '',
      aggregationKey: '',
      summaryTableFields: ''
    });
  }

  private bindControls() {
    this.subscriptions.push(this.anyForm.controls['queryKey'].valueChanges.subscribe(val => {
      this.model['ruleData']['query_key'] = val;
    }));
    this.subscriptions.push(this.anyForm.controls['aggregationKey'].valueChanges.subscribe(val => {
      this.model['ruleData']['aggregation_key'] = val;
    }));
    this.subscriptions.push(this.anyForm.controls['summaryTableFields'].valueChanges.subscribe(val => {
      this.model['ruleData']['summary_table_fields'] = (val as string).split(',');
    }));
  }

}
