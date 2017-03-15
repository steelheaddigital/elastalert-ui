/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { GlobalConfigComponent } from './globalconfig.component';
import { GlobalConfigService, GlobalConfig, MinutesSetting, DaysSetting } from './globalconfig.service';
import * as Mockito from 'ts-mockito';
import * as Rx from 'rxjs';


describe('GlobalconfigComponent', () => {
  let component: GlobalConfigComponent;
  let globalConfigService: GlobalConfigService;
  let globalConfig: GlobalConfig;
  let fixture: ComponentFixture<GlobalConfigComponent>;

  beforeEach(async(() => {
    globalConfigService = Mockito.mock(GlobalConfigService);
    globalConfig = <GlobalConfig>{
      rules_folder: "testFolder",
      run_every: { minutes: 10 },
      buffer_time: { minutes: 10 },
      es_host: "testEsHost",
      es_port: 6556,
      es_url_prefix: "testUrlPrefix",
      use_ssl: true,
      verify_certs: true,
      es_send_get_body_as: 'testEsSendGetBodyAs',
      es_username: "testUserName",
      es_password: "testPassword",
      writeback_index: "testWriteBackIndex",
      alert_time_limit: { days: 3 }
    }

    Mockito.when(globalConfigService.getGlobalConfigData()).thenReturn(new Rx.Observable<GlobalConfig>((observer: Rx.Subscriber<GlobalConfig>) => {
      observer.next(globalConfig);
    }));

    Mockito.when(globalConfigService.saveGlobalConfigData(Mockito.anything())).thenReturn(new Rx.Observable<boolean>((observer: Rx.Subscriber<boolean>) => {
      observer.next(true);
    }));

    TestBed.configureTestingModule({
      declarations: [GlobalConfigComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: GlobalConfigService, useValue: Mockito.instance(globalConfigService) }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and initialize', async(() => {
    expect(component).toBeTruthy();
    expect(component.rulesFolder.value).toEqual("testFolder");
    expect(component.runEvery.value).toEqual(10);
    expect(component.bufferTime.value).toEqual(10);
    expect(component.esHost.value).toEqual("testEsHost");
    expect(component.esPort.value).toEqual(6556);
    expect(component.esUrlPrefix.value).toEqual("testUrlPrefix");
    expect(component.useSsl.value).toEqual(true);
    expect(component.verifyCerts.value).toEqual(true);
    expect(component.esSendBodyAs.value).toEqual("testEsSendGetBodyAs");
    expect(component.esPassword.value).toEqual("testPassword");
    expect(component.esUserName.value).toEqual("testUserName");
    expect(component.writebackIndex.value).toEqual("testWriteBackIndex");
    expect(component.alertTimeLimitDays.value).toEqual(3);
  }));

  describe("save method", () => {
    it('should call service save method with correct values', () => {
      component.save();
      Mockito.verify(globalConfigService.saveGlobalConfigData(Mockito.deepEqual(globalConfig))).atLeast(1);
    });
  })
});
