/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DebugElement, ComponentFactoryResolver } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlertComponent } from './alert.component';
import { EmailComponent } from './email/email.component';
import { HipchatComponent } from './hipchat/hipchat.component';
import { CollapseModule } from 'ng2-bootstrap';
import * as Rx from 'rxjs';


describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let alertForm: FormGroup = new FormGroup({
      type: new FormControl('email')
  })

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
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
        entryComponents: [EmailComponent, HipchatComponent ],
      },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.alertForm = alertForm;
    component.model = { ruleData: { }}
    fixture.detectChanges();
  });

  it('should create and initialize', async(() => {
    expect(component).toBeTruthy();
    expect(component.childComponentRef.componentType).toBe(EmailComponent)
  }));

  it('should update child component when alert type is changed', async(() => {
    alertForm.controls['type'].setValue('hipchat');
    expect(component.childComponentRef.componentType).toBe(HipchatComponent)
  }));
});
