import { Component, OnInit, AfterViewChecked, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { EditService } from './edit.service';
import { MultistepFormClass } from '../../shared/multistep/multistep.form-class';
import { CardinalityComponent } from '../cardinality/cardinality.component';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './step2.component.html',
})

export class EditStep2Component extends MultistepFormClass implements OnInit, AfterViewChecked {

  editForm: FormGroup;

  @ViewChild('rule', {read: ViewContainerRef})
  required: ViewContainerRef;

  constructor (public multistepService: EditService, private componentFactoryResolver: ComponentFactoryResolver, private builder: FormBuilder) 
  { 
    super(multistepService);
  }

  ngOnInit () {
    setTimeout(() => {
      while(true) {
        if(this.required) {
          this.loadRule().subscribe(ruleData => {
            if(ruleData){
              let requiredComponent = this.resolveRequiredComponent(ruleData['type']);
              if(requiredComponent) {
                let requiredComponentRef = this.required.createComponent(requiredComponent);
                requiredComponentRef.instance.model = this.model;
              }
            }
          });
          break;
        }
      }
    }, 1);

    this.model = this.multistepService.model;
  }

  private loadRule(): Observable<any> {
    let selectedRule = this.model['selectedRule'] === undefined ? '' : this.model['selectedRule'];
    return this.multistepService.loadRule(selectedRule)
      .map(result => {
        this.model['ruleData'] = result;
        return result
      })
  }

  private resolveRequiredComponent(ruleType: string): ComponentFactory<any> {
    switch (ruleType) {
      case 'cardinality':
        return this.componentFactoryResolver.resolveComponentFactory(CardinalityComponent);
      default:
        return null;
    }
  }
}