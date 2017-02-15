/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import * as TypeMoq from "typemoq";
import * as Rx from 'rxjs';

import { ElastalertStatusComponent } from './elastalert-status.component';
import { ElastalertStatusService } from './elastalert-status.service';

describe('ElastalertStatusComponent', () => {
  let component: ElastalertStatusComponent;
  let elastalertStatusService: TypeMoq.IMock<ElastalertStatusService>;
  let fixture: ComponentFixture<ElastalertStatusComponent>;

  beforeEach(async(() => {
    elastalertStatusService = TypeMoq.Mock.ofType(ElastalertStatusService);
    elastalertStatusService.setup(x => x.status()).returns(() => new Rx.Observable<boolean>((observer: Rx.Subscriber<boolean>) => {
      observer.next(true);
    }));

    TestBed.configureTestingModule({
      declarations: [ ElastalertStatusComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ElastalertStatusService, useValue: elastalertStatusService.object }
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
