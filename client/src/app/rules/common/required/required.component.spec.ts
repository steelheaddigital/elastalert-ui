/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RequiredCommonComponent } from './required.component';
import * as TypeMoq from "typemoq";
import * as Rx from 'rxjs';


describe('RequiredComponent', () => {
  let component: RequiredCommonComponent;
  let fixture: ComponentFixture<RequiredCommonComponent>;
  let model = {
    ruleData: { 
      index: 'testIndex',
      name: 'testName',
      type: 'any',
      filter: [{ 
        query_string: { 
            query: 'testFilter' 
        }
      }]
    }
  }
  let requiredCommonForm: FormGroup
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RequiredCommonComponent
      ],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredCommonComponent);
    component = fixture.componentInstance;
    component.model = model;
    requiredCommonForm = new FormGroup({
      index: new FormControl(''),
      name: new FormControl(''),
      type: new FormControl(''),
      filter: new FormControl(''),
    });
    component.requiredCommonForm = requiredCommonForm;
    fixture.detectChanges();
  });

  it('should create and initialize', () => {
    expect(component).toBeTruthy();
    expect(component.requiredCommonForm.controls['index'].value).toEqual('testIndex');
    expect(component.requiredCommonForm.controls['name'].value).toEqual('testName');
    expect(component.requiredCommonForm.controls['type'].value).toEqual('any');
    expect(component.requiredCommonForm.controls['filter'].value).toEqual('testFilter');
  });

  it('should update model index on change', () => {
    component.requiredCommonForm.controls['index'].setValue('newIndex');
    expect(component.model['ruleData']['index']).toEqual('newIndex');
  });

  it('should update model es_port on change', () => {
    component.requiredCommonForm.controls['name'].setValue('newName');
    expect(component.model['ruleData']['name']).toEqual('newName');
  });

  it('should update model type and emit event on change', async(() => {
    component.typeUpdated.subscribe(val => {
      expect(val).toEqual('cardinality');
    })
    component.requiredCommonForm.controls['type'].setValue('cardinality');
    expect(component.model['ruleData']['type']).toEqual('cardinality');
  }));

  it('should update model filter on change', () => {
    component.requiredCommonForm.controls['filter'].setValue('newFilter');
    expect(component.model['ruleData']['filter']).toEqual([{ 
        query_string: { 
            query: 'newFilter' 
        }
      }]);
  });


});
