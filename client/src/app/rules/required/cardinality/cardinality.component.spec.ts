/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardinalityComponent } from './cardinality.component';

describe('CardinalityComponent', () => {
  let component: CardinalityComponent;
  let fixture: ComponentFixture<CardinalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardinalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardinalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
