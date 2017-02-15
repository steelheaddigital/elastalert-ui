/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AnyComponent } from './any.component';
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


describe('AnyComponent', () => {
  let component: AnyComponent;
  let rulesService: TypeMoq.IMock<RulesService>;
  let fixture: ComponentFixture<AnyComponent>;
  let model = {
      ruleData: { 
        query_key: 'testQueryKey',
        aggregation_key: 'testAggregationKey',
        summary_table_fields: ['field1','field2']
      }
  }
  beforeEach(async(() => {
    rulesService = TypeMoq.Mock.ofType(RulesService);
    TestBed.configureTestingModule({
      declarations: [
        AnyComponent,
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
    fixture = TestBed.createComponent(AnyComponent);
    component = fixture.componentInstance;
    component.model = model;
    fixture.detectChanges();
  });

  it('should create and initialize', () => {
    expect(component).toBeTruthy();
    expect(component.ruleForm.controls['queryKey'].value).toEqual('testQueryKey');
    expect(component.ruleForm.controls['aggregationKey'].value).toEqual('testAggregationKey');
    expect(component.ruleForm.controls['summaryTableFields'].value).toEqual('field1,field2');
  });

  it('should update model query_key on change', () => {
    component.ruleForm.controls['queryKey'].setValue('newQueryKey');
    expect(component.model['ruleData']['query_key']).toEqual('newQueryKey');
  });

  it('should update model aggregation_key on change', () => {
    component.ruleForm.controls['aggregationKey'].setValue('newAggregationKey');
    expect(component.model['ruleData']['aggregation_key']).toEqual('newAggregationKey');
  });

  it('should update model summary_table_fields on change', () => {
    component.ruleForm.controls['summaryTableFields'].setValue('test1');
    expect(component.model['ruleData']['summary_table_fields']).toEqual(['test1']);
  });
});
