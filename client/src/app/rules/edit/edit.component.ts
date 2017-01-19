import { Component, OnInit, Inject, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RulesService } from '../rules.service';
import { Observable } from 'rxjs/Observable';
import { CardinalityComponent } from '../cardinality/cardinality.component';
import { AnyComponent } from '../any/any.component';
import { BlacklistComponent } from '../blacklist/blacklist.component';
import { WhitelistComponent } from '../whitelist/whitelist.component';
import { ChangeComponent } from '../change/change.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
}) 

export class EditComponent implements OnInit {

  public model = {};
  public rules: string[];
  public editForm: FormGroup
  public ruleSelect: FormControl;
  public ruleComponentRef: ComponentRef<any>;

  @ViewChild('rule', {read: ViewContainerRef})
  rule: ViewContainerRef;

  constructor (private editService: RulesService, private builder: FormBuilder, private componentFactoryResolver: ComponentFactoryResolver) { 
  }

  ngOnInit() {
    this.buildForm();
    this.editService.ruleNames().subscribe(result => {
      this.rules = result;
    });
    this.ruleSelect.valueChanges.subscribe(() => {
      this.onSelectedRuleChanged();
    })
  }

  private buildForm(): void {
    this.ruleSelect = new FormControl();
    this.editForm = this.builder.group({
      ruleSelect: this.ruleSelect
    });
  }

  private onSelectedRuleChanged() {
    while(true) {
      if(this.rule) {
        this.loadRule().subscribe(ruleData => {
          if(ruleData){
            this.loadComponent(ruleData['type'])
          }
        });
        break;
      }
    }
  }

  private loadRule(): Observable<any> {
    let selectedRule = this.model['selectedRule'] === undefined ? '' : this.model['selectedRule'];
    return this.editService.loadRule(selectedRule)
      .map(result => {
        this.model['ruleData'] = result;
        return result
      })
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