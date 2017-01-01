import { Component, OnInit, ComponentFactoryResolver, ComponentFactory, ViewChild, ViewContainerRef } from '@angular/core';
import { CardinalityComponent } from '../cardinality/cardinality.component';
import { AnyComponent } from '../any/any.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @ViewChild('rule', {read: ViewContainerRef})
  rule: ViewContainerRef;

  public model = {
    "ruleData": {
      type: 'any',
     }
  };

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    setTimeout(() => {
      while(true) {
        if(this.rule) {
          this.loadComponent(this.model.ruleData.type);
          break;
        }
      }
    }, 1);
  }

  private resolveRuleComponent(ruleType: string): ComponentFactory<any> {
    switch (ruleType) {
      case 'cardinality':
        return this.componentFactoryResolver.resolveComponentFactory(CardinalityComponent);
      case 'any':
        return this.componentFactoryResolver.resolveComponentFactory(AnyComponent);
      default:
        return null;
    }
  }

  private loadComponent(type){
    let ruleComponent = this.resolveRuleComponent(type);
    this.rule.clear();
    if(ruleComponent) {
      let ruleComponentRef = this.rule.createComponent(ruleComponent);
      ruleComponentRef.instance.model = this.model;
      ruleComponentRef.instance.typeUpdated.subscribe(this.loadComponent.bind(this));
    }
  }

}
