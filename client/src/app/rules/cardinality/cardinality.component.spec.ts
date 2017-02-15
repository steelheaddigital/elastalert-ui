/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CardinalityComponent } from './cardinality.component';
import { OptionalCommonComponent } from '../common/optional/optional.component';
import { RequiredCommonComponent } from '../common/required/required.component';
import { AlertsComponent } from '../alerts/alerts.component';
import { AlertComponent } from '../alert/alert.component';
import { EmailComponent } from '../alert/email/email.component';
import { HipchatComponent } from '../alert/hipchat/hipchat.component';
import { RulesService } from '../rules.service';
import { CollapseModule } from 'ng2-bootstrap';
import * as TypeMoq from "typemoq";
import * as Rx from 'rxjs';


describe('CardinalityComponent', () => {
  let component: CardinalityComponent;
  let rulesService: TypeMoq.IMock<RulesService>;
  let fixture: ComponentFixture<CardinalityComponent>;
  let model = {
      ruleData: { 
        timeframe: {
          minutes: 2
        },
        cardinality_field: 'testCardinalityField',
        query_key: 'testQueryKey',
        max_cardinality: 4,
        min_cardinality: 3
      }
  }
  beforeEach(async(() => {
    rulesService = TypeMoq.Mock.ofType(RulesService);
    TestBed.configureTestingModule({
      declarations: [
          CardinalityComponent,
          OptionalCommonComponent,
          RequiredCommonComponent,
          AlertsComponent,
          AlertComponent,
          EmailComponent
      ],
      imports: [
        ReactiveFormsModule,
        CollapseModule
      ],
      providers: [
        FormBuilder,
        { provide: RulesService, useValue: rulesService.object }
      ]
    })
    
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [
          RequiredCommonComponent, 
          OptionalCommonComponent, 
          AlertsComponent,
          AlertComponent,
          EmailComponent
        ],
      },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardinalityComponent);
    component = fixture.componentInstance;
    component.model = model;
    fixture.detectChanges();
  });

  it('should create and initialize', () => {
    expect(component).toBeTruthy();
    expect(component.ruleForm.controls['timeFrame'].value).toEqual(2);
    expect(component.ruleForm.controls['cardinalityField'].value).toEqual('testCardinalityField');
    expect(component.ruleForm.controls['queryKey'].value).toEqual('testQueryKey');
    expect(component.ruleForm.controls['maxCardinality'].value).toEqual(4);
    expect(component.ruleForm.controls['minCardinality'].value).toEqual(3);
  });

  it('should update model timeframe on change', () => {
    component.ruleForm.controls['timeFrame'].setValue(5);
    expect(component.model['ruleData']['timeframe']['minutes']).toEqual(5);
  });

  it('should update model cardinality_field on change', () => {
    component.ruleForm.controls['cardinalityField'].setValue('newCardinalityField');
    expect(component.model['ruleData']['cardinality_field']).toEqual('newCardinalityField');
  });

  it('should update model query_key on change', () => {
    component.ruleForm.controls['queryKey'].setValue('newQueryKey');
    expect(component.model['ruleData']['query_key']).toEqual('newQueryKey');
  });

  it('should update model max_cardinality on change', () => {
    component.ruleForm.controls['maxCardinality'].setValue(7);
    expect(component.model['ruleData']['max_cardinality']).toEqual(7);
  });

  it('should update model min_cardinality on change', () => {
    component.ruleForm.controls['minCardinality'].setValue(6);
    expect(component.model['ruleData']['min_cardinality']).toEqual(6);
  });

});
