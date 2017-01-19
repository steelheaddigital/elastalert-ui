/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { WhitelistComponent } from './whitelist.component';
import { OptionalCommonComponent } from '../common/optional/optional.component';
import { RequiredCommonComponent } from '../common/required/required.component';
import { AlertsComponent } from '../alerts/alerts.component';
import { AlertComponent } from '../alert/alert.component';
import { EmailComponent } from '../alert/email/email.component';
import { HipchatComponent } from '../alert/hipchat/hipchat.component';
import { RulesService } from '../rules.service';
import * as TypeMoq from "typemoq";
import * as Rx from 'rxjs';


describe('WhitelistComponent', () => {
  let component: WhitelistComponent;
  let rulesService: TypeMoq.IMock<RulesService>;
  let fixture: ComponentFixture<WhitelistComponent>;
  let model = {
      ruleData: { 
        compare_key: 'testCompareKey',
        whitelist: ['test1','test2'],
        ignore_null: true
      }
  }
  beforeEach(async(() => {
    rulesService = TypeMoq.Mock.ofType(RulesService);
    TestBed.configureTestingModule({
      declarations: [
          WhitelistComponent,
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
    fixture = TestBed.createComponent(WhitelistComponent);
    component = fixture.componentInstance;
    component.model = model;
    fixture.detectChanges();
  });

  it('should create and initialize', () => {
    expect(component).toBeTruthy();
    expect(component.ruleForm.controls['compareKey'].value).toEqual('testCompareKey');
    expect(component.ruleForm.controls['whitelist'].value).toEqual('test1,test2');
    expect(component.ruleForm.controls['ignoreNull'].value).toEqual(true);
  });

  it('should update model compare_key on change', () => {
    component.ruleForm.controls['compareKey'].setValue('newCompareKey');
    expect(component.model['ruleData']['compare_key']).toEqual('newCompareKey');
  });

  it('should update model whitelist on change', () => {
    component.ruleForm.controls['whitelist'].setValue('test1,test2,test3');
    expect(component.model['ruleData']['whitelist']).toEqual(['test1','test2','test3']);
  });
  it('should update model ignore_null on change', () => {
    component.ruleForm.controls['ignoreNull'].setValue(false);
    expect(component.model['ruleData']['ignore_null']).toEqual(false);
  });

});
