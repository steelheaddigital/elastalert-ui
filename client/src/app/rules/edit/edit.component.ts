import { Component, OnInit, Inject, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EditService } from './edit.service';
import { Observable } from 'rxjs/Observable';
import { CardinalityComponent } from '../cardinality/cardinality.component';

@Component({
  templateUrl: './edit.component.html',
  providers: [EditService]
}) 

export class EditComponent implements OnInit {

  public model = {};
  public rules: string[];
  public editForm: FormGroup
  public ruleSelect: FormControl;

  @ViewChild('rule', {read: ViewContainerRef})
  rule: ViewContainerRef;

  constructor (private editService: EditService, private builder: FormBuilder, private componentFactoryResolver: ComponentFactoryResolver,) { 
  }

  ngOnInit() {
    this.buildForm();
    this.model = this.editService.model;
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
    setTimeout(() => {
      while(true) {
        if(this.rule) {
          this.loadRule().subscribe(ruleData => {
            if(ruleData){
              let requiredComponent = this.resolveRuleComponent(ruleData['type']);
              if(requiredComponent) {
                let requiredComponentRef = this.rule.createComponent(requiredComponent);
                requiredComponentRef.instance.model = this.model;
              }
            }
          });
          break;
        }
      }
    }, 1);
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
      default:
        return null;
    }
  }
}