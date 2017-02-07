/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FlatlineComponent } from './flatline.component';
import { OptionalCommonComponent } from '../common/optional/optional.component';
import { RequiredCommonComponent } from '../common/required/required.component';
import { AlertsComponent } from '../alerts/alerts.component';
import { AlertComponent } from '../alert/alert.component';
import { EmailComponent } from '../alert/email/email.component';
import { HipchatComponent } from '../alert/hipchat/hipchat.component';
import { RulesService } from '../rules.service';
import * as TypeMoq from "typemoq";
import * as Rx from 'rxjs';


describe('SpikeComponent', () => {
  let component: FlatlineComponent;
  let rulesService: TypeMoq.IMock<RulesService>;
  let fixture: ComponentFixture<FlatlineComponent>;
  let model = {
      ruleData: { 
        query_key: 'testQueryKey',
        timeframe: {
            minutes: 1
        },
        doc_type: 'testDocType',
        threshold: 2
      }
  }
  beforeEach(async(() => {
    rulesService = TypeMoq.Mock.ofType(RulesService);
    TestBed.configureTestingModule({
      declarations: [
          FlatlineComponent,
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
    fixture = TestBed.createComponent(FlatlineComponent);
    component = fixture.componentInstance;
    component.model = model;
    fixture.detectChanges();
  });

  it('should create and initialize', () => {
    expect(component).toBeTruthy();
    expect(component.ruleForm.controls['queryKey'].value).toEqual('testQueryKey');
    expect(component.ruleForm.controls['timeFrame'].value).toEqual(1);
    expect(component.ruleForm.controls['docType'].value).toEqual('testDocType');
    expect(component.ruleForm.controls['threshold'].value).toEqual(2);
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

  it('should update model threshold on change', () => {
    component.ruleForm.controls['threshold'].setValue(9);
    expect(component.model['ruleData']['threshold']).toEqual(9);
  });
});
