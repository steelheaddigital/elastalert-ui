/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import * as Mockito from 'ts-mockito';
import * as Rx from 'rxjs';

import { ElastalertStatusComponent } from './elastalert-status.component';
import { ElastalertStatusService } from './elastalert-status.service';

describe('ElastalertStatusComponent', () => {
  let component: ElastalertStatusComponent;
  let elastalertStatusService: ElastalertStatusService;
  let fixture: ComponentFixture<ElastalertStatusComponent>;

  beforeEach(async(() => {
    elastalertStatusService = Mockito.mock(ElastalertStatusService);
    Mockito.when(elastalertStatusService.status()).thenReturn(new Rx.Observable<boolean>((observer: Rx.Subscriber<boolean>) => {
      observer.next(true);
    }));

    TestBed.configureTestingModule({
      declarations: [ ElastalertStatusComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ElastalertStatusService, useValue: Mockito.instance(elastalertStatusService) }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElastalertStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe("refreshStatus method", () => {
  //   it('should call service status method', () => {
  //     component.refreshStatus();
  //     elastalertStatusService.verify(x => x.status(), TypeMoq.Times.atLeastOnce())
  //   });
  // });

});
