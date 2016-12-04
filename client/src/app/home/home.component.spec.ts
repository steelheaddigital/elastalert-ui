/* tslint:disable:no-unused-variable */
/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { async, inject } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('Component: Home', () => {
  it('should create an instance', () => {
    let component = new HomeComponent();
    expect(component).toBeTruthy();
  });
});
