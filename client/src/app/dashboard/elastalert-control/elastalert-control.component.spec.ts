/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ElastalertControlComponent } from './elastalert-control.component';

describe('ElastalertControlComponent', () => {
  let component: ElastalertControlComponent;
  let fixture: ComponentFixture<ElastalertControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElastalertControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElastalertControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
