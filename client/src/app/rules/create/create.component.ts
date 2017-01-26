import { Component, OnInit, ComponentFactoryResolver, ComponentFactory, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { CardinalityComponent } from '../cardinality/cardinality.component';
import { AnyComponent } from '../any/any.component';
import { BlacklistComponent } from '../blacklist/blacklist.component';
import { WhitelistComponent } from '../whitelist/whitelist.component';
import { ChangeComponent } from '../change/change.component';
import { FrequencyComponent } from '../frequency/frequency.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public ruleComponentRef: ComponentRef<any>;

  public model = {
    "ruleData": {
      type: 'any',
    }
  };

  @ViewChild('rule', {read: ViewContainerRef})
  rule: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    while(true) {
      if(this.rule) {
        this.loadComponent(this.model.ruleData.type);
        break;
      }
    }
  }

  private resolveRuleComponent(ruleType: string): ComponentFactory<any> {
    switch (ruleType) {
      case 'cardinality':
        return this.componentFactoryResolver.resolveComponentFactory(CardinalityComponent);
      case 'any':
        return this.componentFactoryResolver.resolveComponentFactory(AnyComponent);
      case 'blacklist':
        return this.componentFactoryResolver.resolveComponentFactory(BlacklistComponent);
      case 'whitelist':
        return this.componentFactoryResolver.resolveComponentFactory(WhitelistComponent);
      case 'change':
        return this.componentFactoryResolver.resolveComponentFactory(ChangeComponent);
      case 'frequency':
        return this.componentFactoryResolver.resolveComponentFactory(FrequencyComponent);
      default:
        return null;
    }
  }

  private loadComponent(type){
    let ruleComponent = this.resolveRuleComponent(type);
    this.rule.clear();
    if(ruleComponent) {
      this.ruleComponentRef = this.rule.createComponent(ruleComponent);
      this.ruleComponentRef.instance.model = this.model;
      this.ruleComponentRef.instance.typeUpdated.subscribe(this.loadComponent.bind(this));
    }
  }

}
