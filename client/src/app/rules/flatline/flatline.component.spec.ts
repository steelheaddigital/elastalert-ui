/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FlatlineComponent } from './flatline.component';

describe('FlatlineComponent', () => {
  let component: FlatlineComponent;
  let fixture: ComponentFixture<FlatlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
