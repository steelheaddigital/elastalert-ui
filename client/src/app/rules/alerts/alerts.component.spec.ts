/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DebugElement, ComponentFactoryResolver } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { AlertsComponent } from './alerts.component';
import { AlertComponent } from '../alert/alert.component';
import { EmailComponent } from '../alert/email/email.component';
import { HipchatComponent } from '../alert/hipchat/hipchat.component';
import { CollapseModule } from 'ng2-bootstrap';
import * as TypeMoq from "typemoq";
import * as Rx from 'rxjs';


describe('AlertsComponent', () => {
  let component: AlertsComponent;
  let fixture: ComponentFixture<AlertsComponent>;
  let alertGroup: FormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlertsComponent,
        AlertComponent,
        EmailComponent,
        HipchatComponent
      ],
      imports: [
        ReactiveFormsModule,
        CollapseModule
      ],
      providers: [
        ComponentFactoryResolver
      ]
    })

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ AlertComponent, EmailComponent, HipchatComponent ]
      },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsComponent);
    component = fixture.componentInstance;
    component.model = { ruleData: { 
      alert: ['email']
    }}
    alertGroup = new FormGroup({
      alerts: new FormArray([ 
        new FormGroup({
          type: new FormControl('email')
        })
      ])
    })
    component.alertGroup = alertGroup;
    
    fixture.detectChanges();
  });

  it('should create and initialize', () => {
    expect(component).toBeTruthy();
  });

  describe('addAlert method', () => {
    it('adds alert to form and attaches valueChange event on type control to update model when type changes', () => {
      component.addAlert();
      expect((<FormArray>alertGroup.controls['alerts']).length).toBe(2);
    })

    it('attaches valueChange event on type control to update model when type changes', () => {
      component.addAlert();
      let group: FormGroup = (<FormArray>alertGroup.controls['alerts']).at(1) as FormGroup;
      group.controls['type'].setValue('hipchat');
      expect((component.model['ruleData']['alert'] as Array<string>)[1]).toBe('hipchat');
    })
  });

  describe('removeAlert method', () => {
    it('removes alert from form', () => {
      component.removeAlert(0);
      expect((<FormArray>alertGroup.controls['alerts']).length).toBe(0);
    })
  });
});
