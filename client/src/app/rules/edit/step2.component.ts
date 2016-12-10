import { Component, OnInit, AfterViewChecked, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EditService } from './edit.service';
import { MultistepFormClass } from '../../shared/multistep/multistep.form-class';
import { CardinalityComponent } from '../required/cardinality/cardinality.component';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './step2.component.html',
})

export class EditStep2Component extends MultistepFormClass implements OnInit, AfterViewChecked {

  @ViewChild('parent', {read: ViewContainerRef})
  parent: ViewContainerRef;

  constructor (public multistepService: EditService, private componentFactoryResolver: ComponentFactoryResolver) 
  { 
    super(multistepService);
  }

  ngOnInit () {
    setTimeout(() => {
      while(true) {
        if(this.parent) {
          this.loadRule().subscribe(ruleData => {
            let childComponent = this.resolveRuleTypeComponent(ruleData['type']);
            let componentRef = this.parent.createComponent(childComponent);
            componentRef.instance.model = this.model;
          });
          break;
        }
      }
    }, 1);

    this.model = this.multistepService.model;
  }

  private loadRule(): Observable<any> {
    let selectedRule = this.model['selectedRule'];
    return this.multistepService.loadRule(selectedRule)
      .map(result => {
        this.model['ruleData'] = result;
        return result
      })
  }

  private resolveRuleTypeComponent(ruleType: string): ComponentFactory<any> {
    switch (ruleType) {
      case 'cardinality':
        return this.componentFactoryResolver.resolveComponentFactory(CardinalityComponent);
      default:
        return null;
    }
  }
}