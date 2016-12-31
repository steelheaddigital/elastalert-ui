/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HipchatComponent } from './hipchat.component';

describe('HipchatComponent', () => {
  let component: HipchatComponent;
  let fixture: ComponentFixture<HipchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HipchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HipchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
