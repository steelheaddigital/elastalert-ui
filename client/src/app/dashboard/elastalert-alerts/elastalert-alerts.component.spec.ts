/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ElastalertAlertsComponent } from './elastalert-alerts.component';
import { ElastalertAlertsService } from './elastalert-alerts.service';
import * as Mockito from 'ts-mockito';
import * as Rx from 'rxjs';


describe('ElastalertAlertsComponent', () => {
  let component: ElastalertAlertsComponent;
  let elastalertAlertsService: ElastalertAlertsService;
  let fixture: ComponentFixture<ElastalertAlertsComponent>;

  beforeEach(async(() => {
    elastalertAlertsService = Mockito.mock(ElastalertAlertsService);

    Mockito.when(elastalertAlertsService.getAlerts()).thenReturn(new Rx.Observable<Object>((observer: Rx.Subscriber<Object>) => {
      observer.next({someProperty: "SomeValue"});
    }));

    TestBed.configureTestingModule({
      declarations: [ElastalertAlertsComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ElastalertAlertsService, useValue: Mockito.instance(elastalertAlertsService) }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElastalertAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and initialize', () => {
    expect(component).toBeTruthy();
  });
});