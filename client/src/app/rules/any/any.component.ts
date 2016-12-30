import { Component, OnInit, Input } from '@angular/core';
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

  cardinalityForm: FormGroup;
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
          super.handleError(this.cardinalityForm, error);
        })
  }

  private buildForm(): void {
    this.cardinalityForm = this.builder.group({
      commonRequiredForm: this.rulesService.buildRequiredCommonForm(),
      commonOptionalForm: this.rulesService.buildOptionalCommonForm()
    });
  }

  private bindControls() {
  }

}
