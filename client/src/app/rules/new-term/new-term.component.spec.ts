/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NewTermComponent } from './new-term.component';
import { OptionalCommonComponent } from '../common/optional/optional.component';
import { RequiredCommonComponent } from '../common/required/required.component';
import { AlertsComponent } from '../alerts/alerts.component';
import { AlertComponent } from '../alert/alert.component';
import { EmailComponent } from '../alert/email/email.component';
import { HipchatComponent } from '../alert/hipchat/hipchat.component';
import { RulesService } from '../rules.service';
import { CollapseModule } from 'ng2-bootstrap';
import * as Mockito from 'ts-mockito';
import * as Rx from 'rxjs';


describe('NewTermComponent', () => {
  let component: NewTermComponent;
  let rulesService: RulesService;
  let fixture: ComponentFixture<NewTermComponent>;
  let model = {
      ruleData: { 
        query_key: 'testQueryKey',
        doc_type: 'testDocType',
        fields: 'testFields',
        terms_window_size: {
            minutes: 1
        },
        window_step_size: {
            minutes: 2
        },
        alert_on_missing_fields: false
      }
  }
  beforeEach(async(() => {
    rulesService = Mockito.mock(RulesService);
    TestBed.configureTestingModule({
      declarations: [
          NewTermComponent,
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
        { provide: RulesService, useValue: Mockito.instance(rulesService) }
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
    fixture = TestBed.createComponent(NewTermComponent);
    component = fixture.componentInstance;
    component.model = model;
    fixture.detectChanges();
  });

  it('should create and initialize', () => {
    expect(component).toBeTruthy();
    expect(component.ruleForm.controls['queryKey'].value).toEqual('testQueryKey');
    expect(component.ruleForm.controls['docType'].value).toEqual('testDocType');
    expect(component.ruleForm.controls['fields'].value).toEqual('testFields');
    expect(component.ruleForm.controls['termsWindowSize'].value).toEqual(1);
    expect(component.ruleForm.controls['windowStepSize'].value).toEqual(2);
    expect(component.ruleForm.controls['alertOnMissingFields'].value).toEqual(false);
  });

  it('should update model query_key on change', () => {
    component.ruleForm.controls['queryKey'].setValue('newQueryKey');
    expect(component.model['ruleData']['query_key']).toEqual('newQueryKey');
  });

  it('should update model doc_type on change', () => {
    component.ruleForm.controls['docType'].setValue('newDocType');
    expect(component.model['ruleData']['doc_type']).toEqual('newDocType');
  });

  it('should update model fields on change', () => {
    component.ruleForm.controls['fields'].setValue('newFields');
    expect(component.model['ruleData']['fields']).toEqual('newFields');
  });

  it('should update model terms_window_size on change', () => {
    component.ruleForm.controls['termsWindowSize'].setValue(10);
    expect(component.model['ruleData']['terms_window_size']['minutes']).toEqual(10);
  });

  it('should update model window_step_size on change', () => {
    component.ruleForm.controls['windowStepSize'].setValue(10);
    expect(component.model['ruleData']['window_step_size']['minutes']).toEqual(10);
  });

  it('should update model alert_on_missing_fields on change', () => {
    component.ruleForm.controls['alertOnMissingFields'].setValue(true);
    expect(component.model['ruleData']['alert_on_missing_fields']).toEqual(true);
  });
});
