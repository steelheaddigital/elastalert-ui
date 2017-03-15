/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ElastalertControlComponent } from './elastalert-control.component';
import { ElastalertControlService } from './elastalert-control.service';
import * as Mockito from 'ts-mockito';
import * as Rx from 'rxjs';


describe('ElastalertControlComponent', () => {
  let component: ElastalertControlComponent;
  let elastalertControlService: ElastalertControlService;
  let fixture: ComponentFixture<ElastalertControlComponent>;

  beforeEach(async(() => {
    elastalertControlService = Mockito.mock(ElastalertControlService);

    Mockito.when(elastalertControlService.restart()).thenReturn(new Rx.Observable<number>((observer: Rx.Subscriber<number>) => {
      observer.next(123);
    }));
    Mockito.when(elastalertControlService.start()).thenReturn(new Rx.Observable<number>((observer: Rx.Subscriber<number>) => {
      observer.next(123);
    }));
    Mockito.when(elastalertControlService.stop()).thenReturn(new Rx.Observable<number>((observer: Rx.Subscriber<number>) => {
      observer.next(123);
    }));

    TestBed.configureTestingModule({
      declarations: [ElastalertControlComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ElastalertControlService, useValue: Mockito.instance(elastalertControlService) }
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
      Mockito.verify(elastalertControlService.start()).atLeast(1);
    });
  });

  describe("restart method", () => {
    it('should call service restart method', () => {
      component.restart();
      Mockito.verify(elastalertControlService.restart()).atLeast(1);
    });
  });

  describe("stop method", () => {
    it('should call service stop method', () => {
      component.stop();
      Mockito.verify(elastalertControlService.stop()).atLeast(1);
    });
  });
});
