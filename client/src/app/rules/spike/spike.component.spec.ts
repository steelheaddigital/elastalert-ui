/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { SpikeComponent } from './spike.component';
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
  let component: SpikeComponent;
  let rulesService: TypeMoq.IMock<RulesService>;
  let fixture: ComponentFixture<SpikeComponent>;
  let model = {
      ruleData: { 
        query_key: 'testQueryKey',
        timeframe: {
            minutes: 1
        },
        doc_type: 'testDocType',
        terms_size: 2,
        spike_height: 3,
        spike_type: 'testSpikeType',
        alert_on_new_data: false,
        threshold_ref: 4,
        threshold_cur: 5
      }
  }
  beforeEach(async(() => {
    rulesService = TypeMoq.Mock.ofType(RulesService);
    TestBed.configureTestingModule({
      declarations: [
          SpikeComponent,
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
    fixture = TestBed.createComponent(SpikeComponent);
    component = fixture.componentInstance;
    component.model = model;
    fixture.detectChanges();
  });

  it('should create and initialize', () => {
    expect(component).toBeTruthy();
    expect(component.ruleForm.controls['queryKey'].value).toEqual('testQueryKey');
    expect(component.ruleForm.controls['timeFrame'].value).toEqual(1);
    expect(component.ruleForm.controls['docType'].value).toEqual('testDocType');
    expect(component.ruleForm.controls['termsSize'].value).toEqual(2);
    expect(component.ruleForm.controls['spikeHeight'].value).toEqual(3);
    expect(component.ruleForm.controls['spikeType'].value).toEqual('testSpikeType');
    expect(component.ruleForm.controls['alertOnNewData'].value).toEqual(false);
    expect(component.ruleForm.controls['thresholdRef'].value).toEqual(4);
    expect(component.ruleForm.controls['thresholdCur'].value).toEqual(5);
  });

  it('should update model query_key on change', () => {
    component.ruleForm.controls['queryKey'].setValue('newQueryKey');
    expect(component.model['ruleData']['query_key']).toEqual('newQueryKey');
  });

  it('should update model timeframe on change', () => {
    component.ruleForm.controls['timeFrame'].setValue(10);
    expect(component.model['ruleData']['timeframe']['minutes']).toEqual(10);
  });

  it('should update model doc_type on change', () => {
    component.ruleForm.controls['docType'].setValue('newDocType');
    expect(component.model['ruleData']['doc_type']).toEqual('newDocType');
  });

  it('should update model terms_size on change', () => {
    component.ruleForm.controls['termsSize'].setValue(9);
    expect(component.model['ruleData']['terms_size']).toEqual(9);
  });

  it('should update model spike_height on change', () => {
    component.ruleForm.controls['spikeHeight'].setValue(6);
    expect(component.model['ruleData']['spike_height']).toEqual(6);
  });

  it('should update model spike_type on change', () => {
    component.ruleForm.controls['spikeType'].setValue('newSpikeType');
    expect(component.model['ruleData']['spike_type']).toEqual('newSpikeType');
  });

  it('should update model doc_type on change', () => {
    component.ruleForm.controls['alertOnNewData'].setValue(true);
    expect(component.model['ruleData']['alert_on_new_data']).toEqual(true);
  });

  it('should update model terms_size on change', () => {
    component.ruleForm.controls['thresholdRef'].setValue(9);
    expect(component.model['ruleData']['threshold_ref']).toEqual(9);
  });

  it('should update model terms_size on change', () => {
    component.ruleForm.controls['thresholdCur'].setValue(10);
    expect(component.model['ruleData']['threshold_cur']).toEqual(10);
  });
});
