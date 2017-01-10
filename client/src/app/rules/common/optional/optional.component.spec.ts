/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { OptionalCommonComponent } from './optional.component';
import * as TypeMoq from "typemoq";
import * as Rx from 'rxjs';


describe('OriginalComponent', () => {
  let component: OptionalCommonComponent;
  let fixture: ComponentFixture<OptionalCommonComponent>;
  let model = {
    ruleData: { 
      es_host: 'testEsHost',
      es_port: 'testEsPort',
      use_ssl: true,
      verify_certs: true,
      es_username: 'testEsUsername',
      es_password: 'testEsPassword',
      es_url_prefix: 'testEsUrlPrefix',
      es_send_get_body_as: 'testEsSendGetBodyAs',
      use_strftime_index: true,
      aggregation: { minutes: 1},
      description: 'testDescription',
      generate_kibana_link: true,
      use_kibana_dashboard: 'testUseKibanaDashboard',
      kibana_url: 'testKibanaUrl',
      use_kibana4_dashboard: 'testUseKibana4Dashboard',
      kibana4_start_timedelta: { minutes: 2 },
      kibana4_end_timedelta: { minutes: 3 },
      use_local_time: true,
      realert: { minutes: 4 },
      exponential_realert: { minutes: 5 },
      match_enhancements: ['matchEnhancement1','matchEnhancement2'],
      top_count_number: 1,
      top_count_keys: 2,
      raw_count_keys: 3,
      include: ['include1','include2'],
      max_query_size: 4,
      query_delay: { minutes: 5 },
      owner: 'testOwner',
      priority: 6,
      use_count_query: true,
      use_terms_query: true,
      buffer_time: { minutes: 6 },
      timestamp_type: 'testTimestampType',
      timestamp_format: 'testTimestampFormat',
      _source_enabled: true
    }
  }
  let optionalCommonForm: FormGroup
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OptionalCommonComponent,
      ],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalCommonComponent);
    component = fixture.componentInstance;
    component.model = model;
    optionalCommonForm = new FormGroup({
      esHost: new FormControl(''),
      esPort: new FormControl(''),
      useSsl: new FormControl(false),
      verifyCerts: new FormControl(false),
      esUsername: new FormControl(''),
      esPassword: new FormControl(''),
      esUrlPrefix: new FormControl(''),
      esSendGetBodyAs: new FormControl(false),
      useStrFtimeIndex: new FormControl(false),
      aggregation: new FormControl(''),
      description: new FormControl(''),
      generateKibanaLink: new FormControl(false),
      useKibanaDashboard: new FormControl(''),
      kibanaUrl: new FormControl(''),
      useKibana4Dashboard: new FormControl(''),
      kibana4StartTimeDelta: new FormControl(''),
      kibana4EndTimeDelta: new FormControl(''),
      useLocalTime: new FormControl(false),
      realert: new FormControl(false),
      exponentialRealert: new FormControl(''),
      matchEnhancements: new FormControl(''),
      topCountNumber: new FormControl(''),
      topCountKeys: new FormControl(''),
      rawCountKeys: new FormControl(''),
      include: new FormControl(''),
      maxQuerySize: new FormControl(''),
      queryDelay: new FormControl(''),
      owner: new FormControl(''),
      priority: new FormControl(''),
      useCountQuery: new FormControl(false),
      useTermsQuery: new FormControl(false),
      bufferTime: new FormControl(''),
      timestampType: new FormControl(''),
      timestampFormat: new FormControl(''),
      _sourceEnabled: new FormControl(false)
    });
    component.optionalCommonForm = optionalCommonForm;
    fixture.detectChanges();
  });

  it('should create and initialize', () => {
    expect(component).toBeTruthy();
    expect(component.optionalCommonForm.controls['esHost'].value).toEqual('testEsHost');
    expect(component.optionalCommonForm.controls['esHost'].value).toEqual('testEsHost');
    expect(component.optionalCommonForm.controls['useSsl'].value).toEqual(true);
    expect(component.optionalCommonForm.controls['verifyCerts'].value).toEqual(true);
    expect(component.optionalCommonForm.controls['esUsername'].value).toEqual('testEsUsername');
    expect(component.optionalCommonForm.controls['esPassword'].value).toEqual('testEsPassword');
    expect(component.optionalCommonForm.controls['esUrlPrefix'].value).toEqual('testEsUrlPrefix');
    expect(component.optionalCommonForm.controls['esSendGetBodyAs'].value).toEqual('testEsSendGetBodyAs');
    expect(component.optionalCommonForm.controls['useStrFtimeIndex'].value).toEqual(true);
    expect(component.optionalCommonForm.controls['aggregation'].value).toEqual(1);
    expect(component.optionalCommonForm.controls['description'].value).toEqual('testDescription');
    expect(component.optionalCommonForm.controls['generateKibanaLink'].value).toEqual(true);
    expect(component.optionalCommonForm.controls['useKibanaDashboard'].value).toEqual('testUseKibanaDashboard');
    expect(component.optionalCommonForm.controls['kibanaUrl'].value).toEqual('testKibanaUrl');
    expect(component.optionalCommonForm.controls['useKibana4Dashboard'].value).toEqual('testUseKibana4Dashboard');
    expect(component.optionalCommonForm.controls['kibana4StartTimeDelta'].value).toEqual(2);
    expect(component.optionalCommonForm.controls['kibana4EndTimeDelta'].value).toEqual(3);
    expect(component.optionalCommonForm.controls['useLocalTime'].value).toEqual(true);
    expect(component.optionalCommonForm.controls['realert'].value).toEqual(4);
    expect(component.optionalCommonForm.controls['exponentialRealert'].value).toEqual(5);
    expect(component.optionalCommonForm.controls['matchEnhancements'].value).toEqual('matchEnhancement1,matchEnhancement2');
    expect(component.optionalCommonForm.controls['topCountNumber'].value).toEqual(1);
    expect(component.optionalCommonForm.controls['topCountKeys'].value).toEqual(2);
    expect(component.optionalCommonForm.controls['rawCountKeys'].value).toEqual(3);
    expect(component.optionalCommonForm.controls['include'].value).toEqual('include1,include2');
    expect(component.optionalCommonForm.controls['maxQuerySize'].value).toEqual(4);
    expect(component.optionalCommonForm.controls['queryDelay'].value).toEqual(5);
    expect(component.optionalCommonForm.controls['owner'].value).toEqual('testOwner');
    expect(component.optionalCommonForm.controls['priority'].value).toEqual(6);
    expect(component.optionalCommonForm.controls['useCountQuery'].value).toEqual(true);
    expect(component.optionalCommonForm.controls['useTermsQuery'].value).toEqual(true);
    expect(component.optionalCommonForm.controls['bufferTime'].value).toEqual(6);
    expect(component.optionalCommonForm.controls['timestampType'].value).toEqual('testTimestampType');
    expect(component.optionalCommonForm.controls['timestampFormat'].value).toEqual('testTimestampFormat');
    expect(component.optionalCommonForm.controls['_sourceEnabled'].value).toEqual(true);
  });

  it('should update model es_host on change', () => {
    component.optionalCommonForm.controls['esHost'].setValue('newEsHost');
    expect(component.model['ruleData']['es_host']).toEqual('newEsHost');
  });

  it('should update model es_port on change', () => {
    component.optionalCommonForm.controls['esPort'].setValue(2);
    expect(component.model['ruleData']['es_port']).toEqual(2);
  });

  it('should update model use_ssl on change', () => {
    component.optionalCommonForm.controls['useSsl'].setValue(true);
    expect(component.model['ruleData']['use_ssl']).toEqual(true);
  });

  it('should update model verify_certs on change', () => {
    component.optionalCommonForm.controls['verifyCerts'].setValue(true);
    expect(component.model['ruleData']['verify_certs']).toEqual(true);
  });

  it('should update model es_username on change', () => {
    component.optionalCommonForm.controls['esUsername'].setValue('newEsUserName');
    expect(component.model['ruleData']['es_username']).toEqual('newEsUserName');
  });

  it('should update model es_password on change', () => {
    component.optionalCommonForm.controls['esPassword'].setValue('newEsPassword');
    expect(component.model['ruleData']['es_password']).toEqual('newEsPassword');
  });

  it('should update model use_ssl on change', () => {
    component.optionalCommonForm.controls['useSsl'].setValue(true);
    expect(component.model['ruleData']['use_ssl']).toEqual(true);
  });

  it('should update model es_url_prefix on change', () => {
    component.optionalCommonForm.controls['esUrlPrefix'].setValue('newEsUrlPrefix');
    expect(component.model['ruleData']['es_url_prefix']).toEqual('newEsUrlPrefix');
  });

  it('should update model es_send_get_body_as on change', () => {
    component.optionalCommonForm.controls['esSendGetBodyAs'].setValue('newEsSendGetBodyAs');
    expect(component.model['ruleData']['es_send_get_body_as']).toEqual('newEsSendGetBodyAs');
  });

  it('should update model use_strftime_index on change', () => {
    component.optionalCommonForm.controls['useStrFtimeIndex'].setValue(true);
    expect(component.model['ruleData']['use_strftime_index']).toEqual(true);
  });

  it('should update model aggregation on change', () => {
    component.optionalCommonForm.controls['aggregation'].setValue(10);
    expect(component.model['ruleData']['aggregation']['minutes']).toEqual(10);
  });

  it('should update model description on change', () => {
    component.optionalCommonForm.controls['description'].setValue('newDescription');
    expect(component.model['ruleData']['description']).toEqual('newDescription');
  });

  it('should update model generate_kibana_link on change', () => {
    component.optionalCommonForm.controls['generateKibanaLink'].setValue(true);
    expect(component.model['ruleData']['generate_kibana_link']).toEqual(true);
  });

  it('should update model use_kibana_dashboard on change', () => {
    component.optionalCommonForm.controls['useKibanaDashboard'].setValue('newUseKibanaDashboard');
    expect(component.model['ruleData']['use_kibana_dashboard']).toEqual('newUseKibanaDashboard');
  });

  it('should update model kibana_url on change', () => {
    component.optionalCommonForm.controls['kibanaUrl'].setValue('newKibanaUrl');
    expect(component.model['ruleData']['kibana_url']).toEqual('newKibanaUrl');
  });

  it('should update model use_kibana4_dashboard on change', () => {
    component.optionalCommonForm.controls['useKibana4Dashboard'].setValue('newUseKibana4Dashoard');
    expect(component.model['ruleData']['use_kibana4_dashboard']).toEqual('newUseKibana4Dashoard');
  });

  it('should update model kibana4_start_timedelta on change', () => {
    component.optionalCommonForm.controls['kibana4StartTimeDelta'].setValue(11);
    expect(component.model['ruleData']['kibana4_start_timedelta']['minutes']).toEqual(11);
  });

  it('should update model kibana4_end_timedelta on change', () => {
    component.optionalCommonForm.controls['kibana4EndTimeDelta'].setValue(12);
    expect(component.model['ruleData']['kibana4_end_timedelta']['minutes']).toEqual(12);
  });

  it('should update model use_local_time on change', () => {
    component.optionalCommonForm.controls['aggregation'].setValue(true);
    expect(component.model['ruleData']['use_local_time']).toEqual(true);
  });

  it('should update model realert on change', () => {
    component.optionalCommonForm.controls['realert'].setValue(13);
    expect(component.model['ruleData']['realert']['minutes']).toEqual(13);
  });

  it('should update model exponential_realert on change', () => {
    component.optionalCommonForm.controls['exponentialRealert'].setValue(14);
    expect(component.model['ruleData']['exponential_realert']['minutes']).toEqual(14);
  });

  it('should update model match_enhancements on change', () => {
    component.optionalCommonForm.controls['matchEnhancements'].setValue('newMatchEnhancement3,newMatchEnhancement4');
    expect(component.model['ruleData']['match_enhancements']).toEqual(['newMatchEnhancement3','newMatchEnhancement4']);
  });

  it('should update model top_count_keys on change', () => {
    component.optionalCommonForm.controls['topCountNumber'].setValue(15);
    expect(component.model['ruleData']['top_count_number']).toEqual(15);
  });

  it('should update model include on change', () => {
    component.optionalCommonForm.controls['include'].setValue('newInclude1,newInclude2');
    expect(component.model['ruleData']['include']).toEqual(['newInclude1','newInclude2']);
  });


  it('should update model max_query_size on change', () => {
    component.optionalCommonForm.controls['maxQuerySize'].setValue(16);
    expect(component.model['ruleData']['max_query_size']).toEqual(16);
  });

  it('should update model query_delay on change', () => {
    component.optionalCommonForm.controls['queryDelay'].setValue(17);
    expect(component.model['ruleData']['query_delay']['minutes']).toEqual(17);
  });

  it('should update model owner on change', () => {
    component.optionalCommonForm.controls['owner'].setValue('newOwner');
    expect(component.model['ruleData']['owner']).toEqual('newOwner');
  });

  it('should update model priority on change', () => {
    component.optionalCommonForm.controls['priority'].setValue(18);
    expect(component.model['ruleData']['priority']).toEqual(18);
  });

  it('should update model use_count_query on change', () => {
    component.optionalCommonForm.controls['useCountQuery'].setValue(true);
    expect(component.model['ruleData']['use_count_query']).toEqual(true);
  });

  it('should update model use_terms_query on change', () => {
    component.optionalCommonForm.controls['useTermsQuery'].setValue(true);
    expect(component.model['ruleData']['use_terms_query']).toEqual(true);
  });

  it('should update model buffer_time on change', () => {
    component.optionalCommonForm.controls['bufferTime'].setValue(19);
    expect(component.model['ruleData']['buffer_time']['minutes']).toEqual(19);
  });

  it('should update model timestamp_type on change', () => {
    component.optionalCommonForm.controls['timestampType'].setValue('newTimeStampType');
    expect(component.model['ruleData']['timestamp_type']).toEqual('newTimeStampType');
  });

  it('should update model timestamp_format on change', () => {
    component.optionalCommonForm.controls['timestampFormat'].setValue('newTimeStampFormat');
    expect(component.model['ruleData']['timestamp_format']).toEqual('newTimeStampFormat');
  });

  it('should update model _source_enabled on change', () => {
    component.optionalCommonForm.controls['_sourceEnabled'].setValue(true);
    expect(component.model['ruleData']['_source_enabled']).toEqual(true);
  });

});
