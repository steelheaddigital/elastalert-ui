/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ElastalertControlComponent } from './elastalert-control.component';
import { ElastalertControlService } from './elastalert-control.service';
import * as TypeMoq from "typemoq";
import * as Rx from 'rxjs';


describe('GlobalconfigComponent', () => {
  let component: ElastalertControlComponent;
  let elastalertControlService: TypeMoq.IMock<ElastalertControlService>;
  let fixture: ComponentFixture<ElastalertControlComponent>;

  beforeEach(async(() => {
    elastalertControlService = TypeMoq.Mock.ofType(ElastalertControlService);
    elastalertControlService.setup(x => x.restart()).returns(() => new Rx.Observable<number>((observer: Rx.Subscriber<number>) => {
      observer.next(123);
    }));
    elastalertControlService.setup(x => x.start()).returns(() => new Rx.Observable<number>((observer: Rx.Subscriber<number>) => {
      observer.next(123);
    }));
    elastalertControlService.setup(x => x.stop()).returns(() => new Rx.Observable<number>((observer: Rx.Subscriber<number>) => {
      observer.next(123);
    }));

    TestBed.configureTestingModule({
      declarations: [ElastalertControlComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ElastalertControlService, useValue: elastalertControlService.object }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElastalertControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and initialize', () => {
    expect(component).toBeTruthy();
  });

  describe("start method", () => {
    it('should call service start method', () => {
      component.start();
      elastalertControlService.verify(x => x.start(), TypeMoq.Times.atLeastOnce())
    });
  });

  describe("restart method", () => {
    it('should call service restart method', () => {
      component.restart();
      elastalertControlService.verify(x => x.restart(), TypeMoq.Times.atLeastOnce())
    });
  });

  describe("stop method", () => {
    it('should call service stop method', () => {
      component.stop();
      elastalertControlService.verify(x => x.stop(), TypeMoq.Times.atLeastOnce())
    });
  });
});
