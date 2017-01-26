/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FrequencyComponent } from './frequency.component';
import { OptionalCommonComponent } from '../common/optional/optional.component';
import { RequiredCommonComponent } from '../common/required/required.component';
import { AlertsComponent } from '../alerts/alerts.component';
import { AlertComponent } from '../alert/alert.component';
import { EmailComponent } from '../alert/email/email.component';
import { HipchatComponent } from '../alert/hipchat/hipchat.component';
import { RulesService } from '../rules.service';
import * as TypeMoq from "typemoq";
import * as Rx from 'rxjs';


describe('FrequencyComponent', () => {
  let component: FrequencyComponent;
  let rulesService: TypeMoq.IMock<RulesService>;
  let fixture: ComponentFixture<FrequencyComponent>;
  let model = {
      ruleData: { 
        query_key: 'testQueryKey',
        timeframe: {
            minutes: 5
        },
        num_events: 6,
        attach_related: false,
        doc_type: 'testDocType',
        terms_size: 7
      }
  }
  beforeEach(async(() => {
    rulesService = TypeMoq.Mock.ofType(RulesService);
    TestBed.configureTestingModule({
      declarations: [
          FrequencyComponent,
          OptionalCommonComponent,
          RequiredCommonComponent,
          AlertsComponent,
          AlertComponent,
          EmailComponent
      ],
      imports: [ReactiveFormsModule],
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
    fixture = TestBed.createComponent(FrequencyComponent);
    component = fixture.componentInstance;
    component.model = model;
    fixture.detectChanges();
  });

  it('should create and initialize', () => {
    expect(component).toBeTruthy();
    expect(component.ruleForm.controls['queryKey'].value).toEqual('testQueryKey');
    expect(component.ruleForm.controls['timeFrame'].value).toEqual(5);
    expect(component.ruleForm.controls['numEvents'].value).toEqual(6);
    expect(component.ruleForm.controls['attachRelated'].value).toEqual(false);
    expect(component.ruleForm.controls['docType'].value).toEqual('testDocType');
    expect(component.ruleForm.controls['termsSize'].value).toEqual(7);
  });

  it('should update model query_key on change', () => {
    component.ruleForm.controls['queryKey'].setValue('newQueryKey');
    expect(component.model['ruleData']['query_key']).toEqual('newQueryKey');
  });

  it('should update model timeframe on change', () => {
    component.ruleForm.controls['timeFrame'].setValue(10);
    expect(component.model['ruleData']['timeframe']['minutes']).toEqual(10);
  });

  it('should update model num_events on change', () => {
    component.ruleForm.controls['numEvents'].setValue(8);
    expect(component.model['ruleData']['num_events']).toEqual(8);
  });

  it('should update model attach_related on change', () => {
    component.ruleForm.controls['attachRelated'].setValue(true);
    expect(component.model['ruleData']['attach_related']).toEqual(true);
  });

  it('should update model doc_type on change', () => {
    component.ruleForm.controls['docType'].setValue('newDocType');
    expect(component.model['ruleData']['doc_type']).toEqual('newDocType');
  });

  it('should update model terms_size on change', () => {
    component.ruleForm.controls['termsSize'].setValue(9);
    expect(component.model['ruleData']['terms_size']).toEqual(9);
  });
});
