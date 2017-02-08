import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  @Input()
  alertGroup: FormGroup

  @Input()
  model: Object

  public isCollapsed : boolean = true;

  protected subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(protected builder: FormBuilder) { 
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    for(let i = 0; i < this.subscriptions.length; i++){
      this.subscriptions[i].unsubscribe();
    }
  }

  public addAlert() {
    let control = <FormArray>this.alertGroup.controls['alerts'];
    let group: FormGroup = this.buildAlertForm();
    this.subscriptions.push(group.controls['type'].valueChanges.subscribe(val => {
      (this.model['ruleData']['alert'] as Array<string>)[control.length - 1] = val;
    }));
    control.push(group);
  }

  public removeAlert(index: number) {
    let control = <FormArray>this.alertGroup.controls['alerts'];
    control.removeAt(index);
    (this.model['ruleData']['alert'] as Array<string>).splice(index, 1);
  }

  public buildAlertForm(){
    return this.builder.group({
      type: ['', Validators.required]
    })
  }

}
